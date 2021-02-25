import axios from 'axios';
import fileDownload from 'js-file-download';

import RequestManagerException from "@requestManager/Class/RequestManagerException";
import RequestLinkClass   from "@requestManager/Class/RequestLinkClass";

import RequestTypePrepare from "@requestManager/Prepare/RequestTypePrepare";
import RequestUrlPrepare  from "@requestManager/Prepare/RequestUrlPrepare";
import RequestDataPrepare from "@requestManager/Prepare/RequestDataPrepare";
//
import apiResponsePrepare from "@requestManager/Prepare/ResponsePrepare";
import ShowErrorMessage   from '@requestManager/User/ShowErrorMessage';

import {isEmpty} from '@requestManager/Helper';

/**
 * @param type {String}
 * @param url {String}
 * @param params {{get: Object, post:Object}}
 * @param userResponseDataPrepare {Function}
 * @return {Promise<unknown>}
 * @constructor
 */
const SendRequest = async ({
    type,
    url,
    params,
    userResponseDataPrepare, //  = (d) => d
    fileName, // = ''
    errorMessageFunction,//  = null
}
) => {

  let urlClass = new RequestLinkClass(url);

  const _requestType  = RequestTypePrepare(type, urlClass, params);
  const _requestUrl   = RequestUrlPrepare (type, urlClass, params);
  const _requestData  = RequestDataPrepare(type, urlClass, params);

  const axiosObject = {
    method: _requestType,
    url: _requestUrl,
    headers: {}
  };

  if(fileName){
    axiosObject.responseType = 'blob';
  }

  let token = localStorage.getItem('token');
  axiosObject.headers['Authorization'] = `Bearer ${token}`;

  if(!isEmpty(_requestData.get)){
    axiosObject.params  = _requestData.get;
  }
  if(!isEmpty(_requestData.post)){
    axiosObject.data    = _requestData.post;
  }

  let request = null;

  // eslint-disable-next-line no-async-promise-executor
  let promise = new Promise(async function(promiseResolve, promiseReject) {
    try {
      request = axios(axiosObject);
      let response = await request;

      const content = response.headers['content-type'].split(';')[0];
      // const content = response.data.type;

      switch (content) {
        case 'application/json':
          var responseJson = null;
          // fix file load
          if (fileName) {
            responseJson = response.request.response.text().then(text => JSON.parse(text));
          } else {
            responseJson = Promise.resolve(response.data);
          }
          responseJson
            .then(apiResponsePrepare)
            .then(userResponseDataPrepare)
            .then((data) => {
              promiseResolve(data);
            });
          return;

        case 'application/pdf':
          if (response.data.type !== 'application/pdf') {
            throw new RequestManagerException('IS_NOT_FILE', 'Не удалось скачать файл', response);
          }
          fileDownload(response.data, fileName, content);
          promiseResolve({}); // TODO test and add data
          return;

        default:
          console.error('UNDEFINED_CONTENT_TYPE', content, response);
          throw new RequestManagerException('UNDEFINED_CONTENT_TYPE', 'Undefined content type', response);
      }

    } catch (error) {

      let returnError = error;
      if( error.isAxiosError ) {
        // TODO: test and fix  -> error.response.data.error OR error.getMessage()
        returnError = new RequestManagerException('AXIOS_REQUEST_ERROR', error.response.data.error , {axiosErrorObject: error});
      }
      else if( !(error instanceof RequestManagerException) ) {
        returnError = new RequestManagerException('UNDEFINED_ERROR', '', error);
      }

      promiseReject(returnError);

      // errorMessageRun
      if(errorMessageFunction) {
        ShowErrorMessage(errorMessageFunction(returnError));
      }

    }
  });

  promise.abort = function(){
    // TODO: fix message notification
    request && request.abort && request.abort();
  };

  if(window.VueApp) {
    window.VueApp.$store.dispatch('addRequest', request);
  }
  return promise;
};

export default SendRequest;
