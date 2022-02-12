

// 3/4 Отправка данных
import RequestManagerException from "../Class/RequestManagerException";
import ResponseClass from "../Class/ResponseClass";

const requestClientSend = async (requestClient, requestSchemaMergeClass) => {
  
  let requestClientData;
  requestClientData = requestClient.getRequestClientObject(requestSchemaMergeClass)
  requestClientData = requestClient.sendPrepare(requestClientData, requestSchemaMergeClass);
  
  let rcsResponse = {};
  try {
    rcsResponse = await requestClient.send(requestClientData);
  } catch (rcsResponseError) {
    rcsResponse = rcsResponseError;
  }
  
  // network error
  let isNetworkError = requestClient.isNetworkError(rcsResponse, requestClass, Config)
  if(isNetworkError) {
  
    // TODO: fix and return ResponseClass
    
    // TODO: add network exception
    throw new RequestManagerException('ERROR_NETWORK', isNetworkError, {RequestClientResponse: rcsResponse});
  }
  
  // TODO: fix
  /** @type {{headers: {}, data: {}, contentType: string, httpStatus: number}} */
  let ri = await requestClient.getRiObject(rcsResponse);
  return ResponseClass(ri);
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

const Sender = async (requestClient, requestSchemaMergeClass, responsePrepare) => {
  // Отправка данных
  try {
    // Шаг 3
    _step = 'REQUEST_OBJECT_PREPARE';
    const riObject = await requestClientSend(requestClient, requestSchemaMergeClass)
    
    // Шаг 4
    const data = await responseProcessing(responsePrepare);
    
  } catch (e) {
    return newErrorPromise('REQUEST_PROVIDER_GET', e.message, {errorObject: e});
  }
}

export default Sender;
