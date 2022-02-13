
import RequestManagerException    from "../Exception/RequestManagerException";

//
export const createSenderErrorPromise = (code, message = '', details = null) => {
  if(details && details.errorObject) {
    console.warn(details.errorObject);
  }
  let promise = Promise.reject(new RequestManagerException(code, message, details));
  promise.abort = () => {};
  return promise;
};


