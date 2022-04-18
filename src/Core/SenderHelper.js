
import RequestManagerException    from '../Exception/RequestManagerException';


//
export const createSenderError = (exception, code, message = '', details = null) => {
  if (exception instanceof RequestManagerException) {
    return exception;
  }
  console.warn(exception);
  
  const codeMerge     = code || 'ERROR_UNDEFINED';
  const messageMerge  = message || exception.message;
  const detailsMerge  = details || {errorObject: exception};
  
  return new RequestManagerException(codeMerge, messageMerge, detailsMerge);
};


//
export const createSenderErrorPromise = (code, message = '', details = null) => {
  if(details && details.errorObject) {
    console.warn(details.errorObject);
  }
  const promise = Promise.reject(new RequestManagerException(code, message, details));
  promise.abort = () => {};
  return promise;
};
