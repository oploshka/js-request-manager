
import {isString, isFunction} from '../Helper/Helper';

/**
 * Функция которая позволяет обработать requestClass - поле ошибки
 */
const GetErrorMessage = (obj, ri, requestClass, Config) => {
  let message = '';
  switch (true) {
    case isString(obj):
      message = obj;
      break;
    case isFunction(obj):
      message = obj(ri, requestClass, Config);
      break;
  }
  return message;
};


export default async (riObject, requestClass, Config) => {
  let requestClassErrorObject = requestClass.getErrorMessage();
  if(!requestClassErrorObject) {
    return null;
  }
  
  let errMessage = GetErrorMessage(requestClassErrorObject, ri, requestClass, Config);
  return {
    code:     'ERROR_BY_REQUEST_CLASS',
    message:  errMessage,
    data:     {},
  };
};
