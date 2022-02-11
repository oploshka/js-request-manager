
import GetErrorMessage from "js-request-manager/src/Helper/GetErrorMessage";
import {getStatusMessage} from "js-request-manager/src/Helper/HttpStatus";

export const ServerResponseMessage = async (riObject, requestClass, Config) => {
  return {
    code:     'error',
    message:  riObject.data.error || 'Неизвестная ошибка',
    data:     riObject,
  }
};

export const RequestClassMessage = async (riObject, requestClass, Config) => {
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

export const NetworkStatusMessage = async (riObject, requestClass, Config) => {
  
  let errMessage = getStatusMessage(riObject.httpStatus);
  if(!errMessage) {
    return null;
  }
  
  return {
    code:     'ERROR_BY_REQUEST_CLASS',
    message:  errMessage,
    data:     {},
  };
};

export default function () {
  return [
    ServerResponseMessage,
    RequestClassMessage,
    NetworkStatusMessage,
  ];
}
