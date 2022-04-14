
/**
 * @type iRmErrorHandler
 */
const ServerResponseMessage = async (riObject, requestClass, Config) => {
  
  if(!riObject.data.error) {
    return null;
  }
  
  return {
    code:     'error',
    message:  riObject.data.error,
    data:     riObject,
  };
};


export default ServerResponseMessage;