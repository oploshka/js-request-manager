
import {isString, isFunction} from '../Helper/Helper';

/**
 * Функция которая позволяет обработать requestClass - поле ошибки
 *
 * @param obj
 * @param ri
 * @param requestClass
 * @param Config
 * @returns {string}
 * @constructor
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

export default GetErrorMessage;
