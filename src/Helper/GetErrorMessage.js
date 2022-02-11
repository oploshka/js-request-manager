
import {isString, isFunction} from '../Helper/Helper';

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
