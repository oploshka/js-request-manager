// TODO: fix npm install
import axios        from 'axios';
import fileDownload from 'js-file-download';

import RequestManagerException  from "./Class/RequestManagerException";
import AxiosErrorConvert        from "./Helper/AxiosErrorConvert";
import RequestHelper            from "./Helper/RequestHelper";
import ResponseHelper           from "./Helper/ResponseHelper";

/**
 * @param requestInfo {{
 *   type: String,
 *   url: String,
 *   params: {get: Object, post:Object},
 *   userResponseDataPrepare: Function,
 *   fileName: String,
 *   options: Object,
 * }}
 * @return {Promise<unknown>}
 */
const SendRequest = async (requestInfo, Config) => {
  let { type, url, params, userResponseDataPrepare  /* (d) => d */, fileName /* '' */, options} = requestInfo;

  let requestObject;
  try {
    requestObject = RequestHelper.getRequestObject(requestInfo, Config);
  } catch (e) {
    let promise = Promise.reject(new RequestManagerException('REQUEST_OBJECT_PREPARE', e.message, {errorObject: e}));
    promise.abort = () => {};
    return promise;
  }

  let request = null;

  // eslint-disable-next-line no-async-promise-executor
  let promise = new Promise(async function(promiseResolve, promiseReject) {
    try {
      let responseObject = {
        request       : requestObject,
        axios         : null,
        httpStatus    : 0,
        contentType   : null,
        isValid       : true
      };

      try {
        responseObject.axios = await axios(requestObject.axios);
      } catch (error) {
        responseObject.isValid = false;
        responseObject.axios = error;
      }

      responseObject.httpStatus  = ResponseHelper.getHttpStatus(responseObject.axios);
      responseObject.contentType = ResponseHelper.getContentType(responseObject.axios);

      if(responseObject.isValid) {
        responseObject.isValid = !ResponseHelper.isError(responseObject.axios);
      }



      if(!responseObject.isValid) {
        let res = await AxiosErrorConvert(responseObject.axios);
        promiseReject( res );
        return;
      }

      // fix пустого ответа сервера
      if(responseObject.httpStatus === 204) {
        promiseResolve({});
        return;
      }

      if(responseObject.contentType === 'application/json') {

        let _data = await ResponseHelper.getDataPromise(responseObject.axios);
        _data = Config.ResponsePrepare.validate(_data);
        if(requestInfo.userResponseDataPrepare) {
          _data = requestInfo.userResponseDataPrepare(_data);
        }
        promiseResolve(_data);
        return;
      }

      if(responseObject.axios.data instanceof Blob) {
        let contentType = responseObject.axios.data.type;
        fileDownload(responseObject.axios.data, fileName, contentType);
        promiseResolve({}); // TODO test and add data
        return;
      }

      promiseReject(new RequestManagerException('UNDEFINED_CONTENT_TYPE', 'Undefined content type', responseObject));

    } catch (error) {

      let returnError = error;
      if (!(returnError instanceof RequestManagerException)) {
        returnError = new RequestManagerException('ERROR_UNDEFINED', '', returnError);
      }
      promiseReject(returnError);

      // let returnError = await ErrorPrepare(error);
      // promiseReject(returnError);
    }
  });

  promise.abort = function(){
    // TODO: fix message notification
    request && request.abort && request.abort();
  };

  return promise;
};

export default SendRequest;
