import axios from 'axios';
import fileDownload from 'js-file-download';

import RequestManagerException from "@requestManager/Class/RequestManagerException";
import RequestLinkClass   from "@requestManager/Class/RequestLinkClass";

import RequestTypePrepare from "@requestManager/Prepare/RequestTypePrepare";
import RequestUrlPrepare  from "@requestManager/Prepare/RequestUrlPrepare";
import RequestDataPrepare from "@requestManager/Prepare/RequestDataPrepare";
//
import apiResponsePrepare from "@requestManager/Prepare/ResponsePrepare";

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
}) => {

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

  let token = localStorage.getItem('user-token');
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

      let contentType = response.headers['content-type'].split(';')[0];
      // const content = response.data.type;

      let responseJson = null;
      if(contentType === 'application/json') {
        responseJson = Promise.resolve(response.data);
      }
      // Пытались получить файл, а в ответ пришел json
      else if(response.data instanceof Blob && response.data.type === 'application/json') {
        responseJson = response.request.response.text().then(text => JSON.parse(text));
      }
      if(responseJson) {
        responseJson
          .then(apiResponsePrepare)
          .then(userResponseDataPrepare)
          .then((data) => {
            promiseResolve(data);
          });
        return;
      }

      if(response.data instanceof Blob) {
        contentType = response.data.type;
        fileDownload(response.data, fileName, contentType);
        promiseResolve({}); // TODO test and add data
        return;
      }

      // switch (contentType){
      //   case 'application/pdf':
      //     if (response.data.type !== 'application/pdf') {
      //       throw new RequestManagerException('IS_NOT_FILE', 'Не удалось скачать файл', response);
      //     }
      //     fileDownload(response.data, fileName, contentType);
      //     promiseResolve({});
      //     return;
      //
      //   case 'text/csv':
      //     fileDownload(response.data, fileName, contentType);
      //     promiseResolve({});
      //     return;
      // }

      console.error('UNDEFINED_CONTENT_TYPE', contentType, response);
      throw new RequestManagerException('UNDEFINED_CONTENT_TYPE', 'Undefined content type', response);

    } catch (error) {

      let returnError = error;
      if( error.isAxiosError ) {
        let data = error.response.data;

        if(error.response.data instanceof Blob && error.response.data.type === 'application/json'){
          data = await error.response.data.text().then(text => JSON.parse(text));
        }

        let message = '';
        if(data.message) {
          // 500 ошибка
          message = data.message;
        }
        if(data.error) {
          message = data.error;
        }

        returnError = new RequestManagerException('AXIOS_REQUEST_ERROR', message, {axiosErrorObject: error});
      }
      else if( !(error instanceof RequestManagerException) ) {
        returnError = new RequestManagerException('UNDEFINED_ERROR', '', error);
      }

      promiseReject(returnError);
    }
  });

  promise.abort = function(){
    // TODO: fix message notification
    request && request.abort && request.abort();
  };

  return promise;
};

export default SendRequest;
