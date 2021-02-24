import axios from 'axios';
import fileDownload from 'js-file-download';

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
const SendRequestLoadData = (
  type,
  url,
  params,
  // eslint-disable-next-line no-unused-vars
  userResponseDataPrepare = (d) => d
) => {


  const _requestType  = RequestTypePrepare(type, url, params);
  const _requestUrl   = RequestUrlPrepare(type, url, params);
  const _requestData  = RequestDataPrepare(type, url, params);

  type    = _requestType;
  url     = _requestUrl;
  params  = _requestData;


  const axiosObject = {
    method: type,
    url: url,
    headers: {},
    responseType: 'blob',
  };

  let token = localStorage.getItem('token');
  axiosObject.headers['Authorization'] = `Bearer ${token}`;

  axiosObject.params = params.get;
  axiosObject.data = params.post;

  const axiosResponsePrepare = (response) => {
    if (!response) {
      throw new RequestManagerException('AXIOS_ERROR', '', response);
    }

    const content = response.headers['content-type'];
    fileDownload(response.data, params.fileName, content);

    return {};
  }


  return axios(axiosObject)
    .then(axiosResponsePrepare)
    .catch( (error) => {

      // eslint-disable-next-line no-console
      console.warn({RequestManagerDebug: error});

      if( !(error instanceof RequestManagerException) ) {
        error = new RequestManagerException('UNDEFINED_ERROR', '', error);
      }

      return new Promise((resolve, reject) => {
        reject(error);
      });
    });

};

export default SendRequestLoadData;
