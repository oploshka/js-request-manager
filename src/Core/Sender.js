
import RequestManagerException from "../Exception/RequestManagerException";
import ResponseClass from "../Class/ResponseClass";


const newErrorPromise = (code, message = '', details = null) => {
  if(details && details.errorObject) {
    console.warn(details.errorObject);
  }
  let promise = Promise.reject(new RequestManagerException(code, message, details));
  promise.abort = () => {};
  return promise;
};

/**
 *
 * @param {iRequestClient} requestClient
 * @param {RequestClass} requestClass
 * @returns {Promise<ResponseClass>}
 */
const requestClientSend = async (requestClient, requestClass) => {
  
  let requestClientData;
  requestClientData = requestClient.requestToClientObject(requestClass)
  requestClientData = await requestClient.prepareClientObject(requestClientData, requestClass);
  
  let rcsResponse = {};
  try {
    rcsResponse = await requestClient.send(requestClientData);
  } catch (rcsResponseError) {
    rcsResponse = rcsResponseError;
  }
  
  // network error
  let isNetworkError = requestClient.isNetworkError(rcsResponse, requestClass/* , Config */)
  if(isNetworkError) {
  
    // TODO: fix and return ResponseClass
    
    // TODO: add network exception
    throw new RequestManagerException('ERROR_NETWORK', isNetworkError, {RequestClientResponse: rcsResponse});
  }
  
  // TODO: fix
  /** @type {{headers: {}, data: {}, contentType: string, httpStatus: number}} */
  let ri = await requestClient.clientResponseToResponseClass(rcsResponse);
  return new ResponseClass(ri);
}

/**
 *
 * @param responsePrepare
 * @param {iResponsePrepare} responsePrepare
 * @param {ResponseClass} responseClass
 * @param {RequestClass} requestClass
 * @returns {Promise<*>}
 */
const responseProcessing = async (responsePrepare, responseClass, requestClass) => {
  
  // В ответ ошибка
  if( !responsePrepare.isSuccess(responseClass, requestClass/*, Config*/) ) {
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
  let data = await responsePrepare.getSuccessInfo(responseClass, requestClass/*, Config*/);
  
  const responsePrepareFunc = requestClass.getMethodSchema().getResponsePrepare();
  if(responsePrepareFunc) {
    data = await responsePrepareFunc(data);
  }
  
  return data;
}

const Sender = async (requestClient, responsePrepare, requestClass) => {
  // Отправка данных
  try {
    // Шаг 3
    // _step = 'REQUEST_OBJECT_PREPARE';
    const responseClass = await requestClientSend(requestClient, requestClass)
    
    
    
    // Шаг 4
    const data = await responseProcessing(responsePrepare, responseClass, requestClass);
    
    return data;
    
  } catch (e) {
    return newErrorPromise('REQUEST_PROVIDER_GET', e.message, {errorObject: e});
  }
}

export default Sender;
