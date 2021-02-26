
import {isString, isFunction} from '@requestManager/Helper';

const GetErrorMessage = (obj, error) => {
  let message = '';
  switch (true) {
    case isString(obj):
      if(obj === '') {
        message = error.message; // toString();
      } else {
        message = obj + "\n\nДетали по ошибке:\n" + error.message; // toString();
      }
      break;
    case isFunction(obj):
      message = obj(error);
      break;
  }
  return message;
};

export default GetErrorMessage;
