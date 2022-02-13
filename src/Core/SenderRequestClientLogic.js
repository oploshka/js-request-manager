
import RequestManagerException from "../Exception/RequestManagerException";
import ResponseClass from "../Class/ResponseClass";


/**
 *
 * @param {iRequestClient} requestClient
 * @param {RequestClass} requestClass
 * @returns {Promise<ResponseClass>}
 */
const requestClientSend = async (requestClient, requestClass) => {
  
  let requestClientData;
  requestClientData = requestClient.requestToClientObject(requestClass)
  requestClientData = await requestClient.prepareClientObject(requestClientData, requestClass);
  
  let rcsResponse = {};
  try {
    rcsResponse = await requestClient.send(requestClientData);
  } catch (rcsResponseError) {
    rcsResponse = rcsResponseError;
  }
  
  // network error
  let isNetworkError = requestClient.isNetworkError(rcsResponse, requestClass/* , Config */)
  if(isNetworkError) {
  
    // TODO: fix and return ResponseClass
    
    // TODO: add network exception
    throw new RequestManagerException('ERROR_NETWORK', isNetworkError, {RequestClientResponse: rcsResponse});
  }
  
  // TODO: fix
  /** @type {{headers: {}, data: {}, contentType: string, httpStatus: number}} */
  let ri = await requestClient.clientResponseToResponseClass(rcsResponse);
  return new ResponseClass(ri);
}

export default requestClientSend;
