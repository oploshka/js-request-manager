
import RequestManagerException from '@requestManager/Class/RequestManagerException';

const ResponsePrepare = (responseData) => {
  // TODO: fix
  if (!responseData.success || responseData.success === false) {
    throw new RequestManagerException('BACKEND_ERROR', responseData.error, responseData);
  }
  return responseData.data;
};

export default ResponsePrepare;
