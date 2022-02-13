
import RequestManagerException  from "../Exception/RequestManagerException";
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
  // TODO: delete ?
  const Config = _cnfg;
  
  /**
   * Оборачиваем запрос в промис с возможностью отклонить запрос
   * @param {RequestClass} requestClass
   * @return {Promise<unknown>}
   */
  this.send = async (requestSchemaMergeClass) => {
  
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
