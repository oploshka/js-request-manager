import axios from 'axios';

import RequestManagerException from "@service/RequestManager/RequestManagerException";

import RequestTypePrepare from "@service/RequestManager/src/RequestPrepare/RequestTypePrepare";
import RequestUrlPrepare  from "@service/RequestManager/src/RequestPrepare/RequestUrlPrepare";
import RequestDataPrepare from "@service/RequestManager/src/RequestPrepare/RequestDataPrepare";

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
  userResponseDataPrepare = (d) => d
) => {


  const _requestType  = RequestTypePrepare(type, url, params);
  const _requestUrl   = RequestUrlPrepare(type, url, params);
  const _requestData  = RequestDataPrepare(type, url, params);

  // TODO: use getApiResponsePrepare
  const apiResponsePrepare = (responseData) => {
    // TODO: fix
    if (responseData.success === false) {
      throw new RequestManagerException('BACKEND_ERROR', responseData.error, responseData);
    }
    return responseData.data;
  };

  type    = _requestType;
  url     = _requestUrl;
  params  = _requestData;


  const axiosObject = {
    method: type,
    url: url,
    headers: {}
  };

  let token = localStorage.getItem('token');
  axiosObject.headers['Authorization'] = `Bearer ${token}`;

  axiosObject.params = params.get;
  axiosObject.data = params.post;

  const axiosResponsePrepare = (response) => {
    if (!response) {
      throw new RequestManagerException('AXIOS_ERROR', '', response);
    }
    return response.data;
  };


  let request = axios(axiosObject)
    .then(axiosResponsePrepare)
    .then(apiResponsePrepare)
    .then(userResponseDataPrepare)
    .catch( (error) => {
      if( error.isAxiosError ) {
        // TODO: test and fix  -> error.response.data.error OR error.getMessage()
        error = new RequestManagerException('AXIOS_REQUEST_ERROR', error.response.data.error , {axiosErrorObject: error});
      }
      else if( !(error instanceof RequestManagerException) ) {
        error = new RequestManagerException('UNDEFINED_ERROR', '', error);
      }

      return new Promise((resolve, reject) => {
        reject(error);
      });
    });

  if(window.VueApp) {
    window.VueApp.$store.dispatch('addRequest', request);
  }
  return request;
};

export default SendRequest;
