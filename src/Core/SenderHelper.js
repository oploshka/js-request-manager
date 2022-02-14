
import RequestManagerException    from "../Exception/RequestManagerException";


//
export const createSenderError = (exception, code, message = '', details = null) => {
  if (exception instanceof RequestManagerException) {
    return exception;
  }
  
  let codeMerge     = code || 'ERROR_UNDEFINED'
  let messageMerge  = message || exception.message;
  let detailsMerge  = details || {errorObject: e}
  
  return new RequestManagerException(codeMerge, messageMerge, detailsMerge);
};


//
export const createSenderErrorPromise = (code, message = '', details = null) => {
  if(details && details.errorObject) {
    console.warn(details.errorObject);
  }
  let promise = Promise.reject(new RequestManagerException(code, message, details));
  promise.abort = () => {};
  return promise;
};


