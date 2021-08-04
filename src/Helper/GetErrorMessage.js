
import {isString, isFunction} from '../Helper/Helper';

const GetErrorMessage = (obj, ri, requestClass, Config) => {
  let message = '';
  switch (true) {
    case isString(obj):
      if(obj === '') {
        message = (ri.data && ri.data.message) ? ri.data.message : 'Не известная ошибка' ; // toString();
      } else {
        message = obj + "\n\nДетали по ошибке:\n" + error.message; // toString();
      }
      break;
    case isFunction(obj):
      message = obj(ri, requestClass, Config);
      break;
  }
  return message;
};

export default GetErrorMessage;
