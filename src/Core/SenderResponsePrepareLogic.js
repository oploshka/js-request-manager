
import RequestManagerException from '../Exception/RequestManagerException';
import ResponseClass from '../Class/ResponseClass';


/**
 *
 * @param responsePrepare
 * @param {testServerResponsePrepare} responsePrepare
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
        errObj = await errorHandlerList[i](responseClass, requestClass);
        if(errObj) {
          // TODO: add validate return data
          break;
        }
      } catch (e) {
        console.warn('[REQUEST_MANAGER] errorHandler error', e, responseClass, requestClass);
      }
    }
    
    //
    if(errObj) {
      throw new RequestManagerException(errObj.code, errObj.message, errObj.details);
    }
    
    // Не удалось получить ошибку - по этой причине выводим что нибудь.
    throw new RequestManagerException('NOT_VALID_RESPONSE', 'Undefined error', {
      responseClass: responseClass,
      requestClass: requestClass,
    });
  }
  
  // Обрабатываем успешный ответ
  let data = await responsePrepare.getSuccessInfo(responseClass, requestClass/*, Config*/);
  
  const responsePrepareFunc = requestClass.getMethodInfo().getResponsePrepare();
  if(responsePrepareFunc) {
    data = await responsePrepareFunc(data);
  }
  
  return data;
};

export default responseProcessing;
