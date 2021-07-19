
import RequestManagerException  from "../Class/RequestManagerException";
import RequestLinkClass         from "../Class/RequestLinkClass";

import { getStatusMessage } from "../Helper/HttpStatus";
import GetErrorMessage from "../Helper/GetErrorMessage";


const sendRequestClass = function(_rc, _cnfg) {

  const RequestClient = _rc;
  const Config = _cnfg;

  /**
   * @param {RequestClass} requestClass
   * @return {{data: Object, type: String, url: String}}
   */
  this.getRequestObject = (requestClass) => {

    const type      = requestClass.getType();
    const url       = requestClass.getUrl();
    const params    = requestClass.getParams();

    let urlClass = new RequestLinkClass(url, Config.hostSchema);
    return {
      type      : Config.RequestPrepare.type(type, urlClass, params),
      url       : Config.RequestPrepare.url(type, urlClass, params),
      data      : Config.RequestPrepare.data(type, urlClass, params),
    };
  };

  /**
   * @param {RequestClass} requestClass
   * @return {Promise<unknown>}
   */
  this.send = async (requestClass) => {

    let requestObject;
    let requestClientData;
    try {
      requestObject = this.getRequestObject(requestClass);

      requestClientData = RequestClient.getRequestClientObject(requestObject, requestClass)
      requestClientData = Config.RequestPrepare.requestClientDataPrepare(requestClientData, requestClass);
    } catch (e) {
      let promise = Promise.reject(new RequestManagerException('REQUEST_OBJECT_PREPARE', e.message, {errorObject: e}));
      promise.abort = () => {};
      return promise;
    }

    let request = null;

    // eslint-disable-next-line no-async-promise-executor
    let promise = new Promise(async function(promiseResolve, promiseReject) {
      try {

        let rcsResponse = {};
        try {
          rcsResponse = await RequestClient.send(requestClientData);
        } catch (rcsResponseError) {
          rcsResponse = rcsResponseError;
        }

        // network error
        let isNetworkError = RequestClient.isNetworkError(rcsResponse, requestClass, Config)
        if(isNetworkError) {
          promiseReject( new RequestManagerException('ERROR_NETWORK', isNetworkError, {RequestClientResponse: rcsResponse}));
          return;
        }

        /**
         * @type {{headers: {}, data: {}, contentType: string, httpStatus: number}}
         */
        let ri = await RequestClient.getRiObject(rcsResponse);

        //
        if( Config.ResponsePrepare.isError(ri, requestClass, Config) ) {

          let errCode    = '';
          let errMessage = '';
          let errDetails = null;

          let requestClassErrorObject = requestClass.getErrorMessage();
          if(requestClassErrorObject) {
            errMessage = GetErrorMessage(requestClassErrorObject);
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
