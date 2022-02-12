
import RequestManagerException  from "../Class/RequestManagerException";
import RequestLinkClass         from "../Class/RequestLinkClass";

const newErrorPromise = (code, message = '', details = null) => {
  let promise = Promise.reject(new RequestManagerException(code, message, details));
  promise.abort = () => {};
  return promise;
};

// 1/4 подготовка данных
const sendGetProvider = () => {
  return
}



// 3/4 Отправка данных
const requestClientSend = async (requestClient, requestObject, requestClass) => {
  
  let requestClientData;
  requestClientData = requestClient.getRequestClientObject(requestObject, requestClass)
  requestClientData = requestClient.sendPrepare(requestClientData, requestObject, requestClass);
  
  let rcsResponse = {};
  try {
    rcsResponse = await requestClient.send(requestClientData);
  } catch (rcsResponseError) {
    rcsResponse = rcsResponseError;
  }
  
  // network error
  let isNetworkError = requestClient.isNetworkError(rcsResponse, requestClass, Config)
  if(isNetworkError) {
    // TODO: add network exception
    throw new RequestManagerException('ERROR_NETWORK', isNetworkError, {RequestClientResponse: rcsResponse});
  }
  
  /** @type {{headers: {}, data: {}, contentType: string, httpStatus: number}} */
  let ri = await requestClient.getRiObject(rcsResponse);
  return ri;
}

// 4/4 Обработка ответа
const responseProcessing = async (responsePrepare, ri, requestClass) => {
  
  // В ответ ошибка
  if( !responsePrepare.isSuccess(ri, requestClass, Config) ) {
    let errObj = null;
    
    // вызываем цепочку пользовательских функций по получению ошибки.
    const errorHandlerList = responsePrepare.getErrorHandlerList();
    for(let i = 0; i < errorHandlerList.length; i++) {
      try {
        errObj = await errorHandlerList[i](ri, requestClass, Config);
        if(errObj) {
          throw new RequestManagerException(errCode, errMessage, errDetails);
        }
      } catch (e) {
        console.warn('[REQUEST_MANAGER] errorHandler error', e)
      }
    }
    // Не удалось получить ошибку - по этой причине выводим что нибудь.
    throw new RequestManagerException('NOT_VALID_RESPONSE', 'Undefined error', {});
  }
  
  // Обрабатываем успешный ответ
  let data = await responsePrepare.getSuccessInfo(ri, requestClass, Config);
  
  const responsePrepareFunc = requestClass.getResponsePrepare();
  if(responsePrepareFunc) {
    data = await responsePrepareFunc(data);
  }
  
  return data;
}

const sendLogic = async (promiseObj, requestClass) => {
  
  
  
  let _step = 'REQUEST_PROVIDER_GET';
  
  try {
    let provider = RequestProvider.getPreset(requestClass);
    // requestGroupName  = obj.name;
    // requestClient     = obj.RequestClient;
    // requestPrepare    = obj.RequestPrepare;
    // responsePrepare   = obj.ResponsePrepare;
    
    // Шаг 2
    _step = 'REQUEST_OBJECT_PREPARE';
    const requestObject = getRequestObject(requestClass, hostSchema)
    
    // Шаг 3
    _step = 'REQUEST_OBJECT_PREPARE';
    const riObject = await requestClientSend(provider.RequestClient)
    
    // Шаг 4
    const data = await responseProcessing();
    
  } catch (e) {
    return newErrorPromise('REQUEST_PROVIDER_GET', e.message, {errorObject: e});
  }
}

const sendRequestClass = function(_rcp, _cnfg) {

  const RequestProvider = _rcp;
  const hostSchema = _cnfg.hostSchema;
  // TODO: delete ?
  const Config = _cnfg;
  
  /**
   * Оборачиваем запрос в промис с возможностью отклонить запрос
   * @param {RequestClass} requestClass
   * @return {Promise<unknown>}
   */
  this.send = async (requestClass) => {
  
    let promiseObj = null;
    //
    let promise = new Promise(function (resolve, reject) {
      promiseObj = {
        resolve: resolve,
        reject: reject,
        abortStatus: false, // TODO: общий статус SEND | SUCCESS | ERROR | ABORT
        abort: () => {}, // необходимо переопределить
      }
    });
  
    promise.abort = () => {
      if(!promiseObj.abortStatus) { // TODO : add success | error
        promiseObj.abortStatus = true;
        promiseObj.abort();
      }
    };
  
    //
    sendLogic(promiseObj, requestClass);
    
    return promise;
  }
};

export default sendRequestClass;
