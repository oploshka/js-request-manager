
import RequestManagerException    from "../Exception/RequestManagerException";
import SenderRequestClientLogic   from "./SenderRequestClientLogic";
import SenderResponsePrepareLogic from "./SenderResponsePrepareLogic";


const newErrorPromise = (code, message = '', details = null) => {
  if(details && details.errorObject) {
    console.warn(details.errorObject);
  }
  let promise = Promise.reject(new RequestManagerException(code, message, details));
  promise.abort = () => {};
  return promise;
};


const Sender = async (requestClient, responsePrepare, requestClass) => {
  // Отправка данных
  try {
    // Шаг 3
    // _step = 'REQUEST_OBJECT_PREPARE';
    const responseClass = await SenderRequestClientLogic(requestClient, requestClass)
    
    
    
    // Шаг 4
    const data = await SenderResponsePrepareLogic(responsePrepare, responseClass, requestClass);
    
    return data;
    
  } catch (e) {
    return newErrorPromise('REQUEST_PROVIDER_GET', e.message, {errorObject: e});
  }
}

export default Sender;
