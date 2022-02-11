
import RequestManagerException  from "../Class/RequestManagerException";
import RequestLinkClass         from "../Class/RequestLinkClass";

import { getStatusMessage } from "../Helper/HttpStatus";
import GetErrorMessage from "../Helper/GetErrorMessage";

const newErrorPromise = (code, message = '', details = null) => {
  let promise = Promise.reject(new RequestManagerException(code, message, details));
  promise.abort = () => {};
  return promise;
};

const sendRequestClass = function(_rcp, _cnfg) {

  const RequestProvider = _rcp;
  const Config = _cnfg;
  
  /**
   * @param {RequestClass} requestClass
   * @return {Promise<unknown>}
   */
  this.send = async (requestClass) => {
  
    // обработчики для запроса
    let requestGroupName;
    let requestPrepare;
    let requestClient;
    let responsePrepare;
  
    try {
      let obj = RequestProvider.getPreset(requestClass);
      requestGroupName  = obj.name;
      requestClient     = obj.RequestClient;
      requestPrepare    = obj.RequestPrepare;
      responsePrepare   = obj.ResponsePrepare;
    } catch (e) {
      return newErrorPromise('REQUEST_PROVIDER_GET', e.message, {errorObject: e});
    }
  
    // данные для запроса
    let requestObject;
  
    try {
      const type      = requestClass.getType();
      const url       = requestClass.getUrl();
      const params    = requestClass.getParams();
    
      let urlClass = new RequestLinkClass(url, Config.hostSchema);
      requestObject = {
        type      : requestPrepare.type(type, urlClass, params),
        url       : requestPrepare.url(type, urlClass, params),
        data      : requestPrepare.data(type, urlClass, params),
      };
    } catch (e) {
      return newErrorPromise('REQUEST_OBJECT_PREPARE', e.message, {errorObject: e});
    }
    
    let requestClientData;
    try {
      requestClientData = requestClient.getRequestClientObject(requestObject, requestClass)
      requestClientData = requestClient.sendPrepare(requestClientData, requestObject, requestClass);
    } catch (e) {
      return newErrorPromise('REQUEST_OBJECT_PREPARE', e.message, {errorObject: e});
    }

    let request = null;

    // eslint-disable-next-line no-async-promise-executor
    let promise = new Promise(async function(promiseResolve, promiseReject) {
      try {

        let rcsResponse = {};
        try {
          rcsResponse = await requestClient.send(requestClientData);
        } catch (rcsResponseError) {
          rcsResponse = rcsResponseError;
        }

        // network error
        let isNetworkError = requestClient.isNetworkError(rcsResponse, requestClass, Config)
        if(isNetworkError) {
          promiseReject( new RequestManagerException('ERROR_NETWORK', isNetworkError, {RequestClientResponse: rcsResponse}));
          return;
        }

        /**
         * @type {{headers: {}, data: {}, contentType: string, httpStatus: number}}
         */
        let ri = await requestClient.getRiObject(rcsResponse);

        //
        if( Config.ResponsePrepare.isError(ri, requestClass, Config) ) {

          let errCode    = '';
          let errMessage = '';
          let errDetails = null;

          // TODO: добавить параметр undefinedErrorMessage!!!!
          // TODO: fix - тут приходит строка
          // TODO: fix - GetErrorMessage - ожидал 2 параметра!!!!
          let requestClassErrorObject = requestClass.getErrorMessage();
          if(requestClassErrorObject) {
            errMessage = GetErrorMessage(requestClassErrorObject, ri, requestClass, Config);
          }

          if(!errMessage) {
            let errObj = await Config.ResponsePrepare.getErrorInfo(ri, requestClass, Config);
            errCode     = (errObj && errObj.code)     ? errObj.code    : errCode;
            errMessage  = (errObj && errObj.message)  ? errObj.message : errMessage;
            errDetails  = (errObj && errObj.data)     ? errObj.data    : errDetails;
          }

          if(!errMessage) {
            errCode     = errCode    ? errCode     : 'NOT_VALID_RESPONSE';
            errMessage  = errMessage ? errMessage  : getStatusMessage(ri.httpStatus);
            errDetails  = errDetails ? errDetails  : {axiosErrorObject: rcsResponse};
          }

          promiseReject( new RequestManagerException(errCode, errMessage, errDetails));
          return;
        }


        let data = await Config.ResponsePrepare.getSuccessInfo(ri, requestClass, Config);

        if(data instanceof Blob) {
          data = await RequestClient.fileDownload(data, ri, requestClass, Config);
        }

        const responsePrepareFunc = requestClass.getResponsePrepare();
        if(responsePrepareFunc) {
          data = responsePrepareFunc(data);
        }

        promiseResolve(data);

      } catch (error) {

        let returnError = error;
        if (!(returnError instanceof RequestManagerException)) {
          returnError = new RequestManagerException('ERROR_UNDEFINED', '', returnError);
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

};

export default sendRequestClass;
