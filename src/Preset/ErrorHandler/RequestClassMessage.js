
import {isString, isFunction} from 'js-request-manager/src/Helper/Helper';

/**
 * Функция которая позволяет обработать requestClass - поле ошибки
 */
const GetErrorMessage = (obj, responseClass, requestClass /*, Config*/) => {
  let message = '';
  switch (true) {
    case isString(obj):
      message = obj;
      break;
    case isFunction(obj):
      message = obj(responseClass, requestClass /*, Config*/);
      break;
  }
  return message;
};


/**
 * @param {ResponseClass} responseClass
 * @param {RequestClass} requestClass
 * @returns {Promise<{code: string, message: string, data: {Object}}>}
 */
export default async (responseClass, requestClass) => {
  let requestClassErrorObject = requestClass.getMethodInfo().getErrorMessage();
  if(!requestClassErrorObject) {
    return null;
  }
  
  let errMessage = GetErrorMessage(requestClassErrorObject, responseClass, requestClass/*, Config*/);
  if(!errMessage) {
    return null;
  }
  return {
    code:     'ERROR_BY_REQUEST_CLASS',
    message:  errMessage,
    data:     {},
  };
};
