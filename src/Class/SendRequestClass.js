
import RequestManagerException  from "../Class/RequestManagerException";
import RequestLinkClass         from "../Class/RequestLinkClass";

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
          // TODO: fix and add network error message validate
          // responsePrepare.getErrorNetworkMessage();
          promiseReject( new RequestManagerException('ERROR_NETWORK', isNetworkError, {RequestClientResponse: rcsResponse}));
          return;
        }

        /** @type {{headers: {}, data: {}, contentType: string, httpStatus: number}} */
        let ri = await requestClient.getRiObject(rcsResponse);

        // В ответ ошибка
        if( !responsePrepare.isSuccess(ri, requestClass, Config) ) {
          let errObj = null;
          
          // вызываем цепочку пользовательских функций по получению ошибки.
          const errorHandlerList = responsePrepare.getErrorHandlerList();
          for(let i = 0; i < errorHandlerList.length; i++) {
            try {
              errObj = await errorHandlerList[i](ri, requestClass, Config);
              if(errObj) {
                // TODO: add responsePrepare.all error
                promiseReject( new RequestManagerException(errCode, errMessage, errDetails) );
                return;
              }
            } catch (e) {
              console.warn('[REQUEST_MANAGER] errorHandler error', e)
            }
          }
          // Не удалось получить ошибку - по этой причине выводим что нибудь.
          // TODO: add responsePrepare.all error
          promiseReject( new RequestManagerException('NOT_VALID_RESPONSE', 'Undefined error', {}));
          return;
        }

        //
        let data = await responsePrepare.getSuccessInfo(ri, requestClass, Config);

        const responsePrepareFunc = requestClass.getResponsePrepare();
        if(responsePrepareFunc) {
          data = await responsePrepareFunc(data);
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
