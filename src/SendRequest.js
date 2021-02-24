import axios from 'axios';
import fileDownload from 'js-file-download';

import RequestManagerException from "@requestManager/Class/RequestManagerException";
import RequestLinkClass   from "@requestManager/Class/RequestLinkClass";

import RequestTypePrepare from "@requestManager/Prepare/RequestTypePrepare";
import RequestUrlPrepare  from "@requestManager/Prepare/RequestUrlPrepare";
import RequestDataPrepare from "@requestManager/Prepare/RequestDataPrepare";

/**
 * @param type {String}
 * @param url {String}
 * @param params {{get: Object, post:Object}}
 * @param userResponseDataPrepare {Function}
 * @return {Promise<unknown>}
 * @constructor
 */
const SendRequest = (
  type,
  url,
  params,
  userResponseDataPrepare = (d) => d,
  fileName = ''
) => {

  let urlClass = new RequestLinkClass(url);


  const _requestType  = RequestTypePrepare(type, urlClass, params);
  const _requestUrl   = RequestUrlPrepare (type, urlClass, params);
  const _requestData  = RequestDataPrepare(type, urlClass, params);

  // TODO: use getApiResponsePrepare
  const apiResponsePrepare = (responseData) => {
    // TODO: fix
    if (!responseData.success || responseData.success === false) {
      throw new RequestManagerException('BACKEND_ERROR', responseData.error, responseData);
    }
    return responseData.data;
  }


  const axiosObject = {
    method: _requestType,
    url: _requestUrl,
    headers: {}
  };

  if(fileName){
    axiosObject.responseType = 'blob'
  }

  let token = localStorage.getItem('token');
  axiosObject.headers['Authorization'] = `Bearer ${token}`;

  function isEmpty(value) {
    return Boolean(value && typeof value === 'object') && !Object.keys(value).length;
  }

  if(!isEmpty(_requestData.get)){
    // console.log(_requestData.get);
    axiosObject.params  = _requestData.get;
  }
  if(!isEmpty(_requestData.post)){
    // console.log(_requestData.post);
    axiosObject.data    = _requestData.post;
  }

  let request = axios(axiosObject)
    .then( (response) => {
      const content = response.headers['content-type'].split(';')[0];
      // const content = response.data.type;

      switch (content) {
        case 'application/json':

          // fix file load
          if(fileName){
            // console.log('response', response)
            return response.request.response.text()
              .then(text => JSON.parse(text))
              .then(apiResponsePrepare)
              .then(userResponseDataPrepare);
          }
          return Promise.resolve(response.data)
            .then(apiResponsePrepare)
            .then(userResponseDataPrepare);

        case 'application/pdf':
          // TODO: delete
          // console.log('response', response)
          if(response.data.type !== 'application/pdf'){
            throw new RequestManagerException('IS_NOT_FILE', 'Не удалось скачать файл', response);
          }
          fileDownload(response.data, fileName, content);
          return;

        default:
          console.error('UNDEFINED_CONTENT_TYPE', content, response)
          throw new RequestManagerException('UNDEFINED_CONTENT_TYPE', 'Undefined content type', response);
      }

    })
    .catch( (error) => {
      let returnError = error;
      if( error.isAxiosError ) {
        // TODO: test and fix  -> error.response.data.error OR error.getMessage()
        returnError = new RequestManagerException('AXIOS_REQUEST_ERROR', error.response.data.error , {axiosErrorObject: error});
      }
      else if( !(error instanceof RequestManagerException) ) {
        returnError = new RequestManagerException('UNDEFINED_ERROR', '', error);
      }

      return Promise.reject(returnError)
    });

  if(window.VueApp) {
    window.VueApp.$store.dispatch('addRequest', request);
  }
  return request;
};

export default SendRequest;
