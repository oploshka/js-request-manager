
import NetworkStatusMessage from "js-request-manager/src/ErrorHandler/NetworkStatusMessage";
import RequestClassMessage from "js-request-manager/src/ErrorHandler/RequestClassMessage";

export const ServerResponseMessage = async (riObject, requestClass, Config) => {
  
  if(!riObject.data.error) {
    return null;
  }
  
  return {
    code:     'error',
    message:  riObject.data.error,
    data:     riObject,
  }
};


export default function () {
  return [
    ServerResponseMessage,
    RequestClassMessage,
    NetworkStatusMessage,
  ];
}
