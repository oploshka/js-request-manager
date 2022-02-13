
import RequestManagerException from "../Exception/RequestManagerException";
import ResponseClass from "../Class/ResponseClass";


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

export default responseProcessing;
