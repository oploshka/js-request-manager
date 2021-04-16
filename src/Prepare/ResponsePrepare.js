
import RequestManagerException from '@requestManager/Class/RequestManagerException';

const ResponsePrepare = (responseData) => {
  // TODO: fix
  if (responseData.details) {
    throw new RequestManagerException('BACKEND_ERROR', responseData.details, responseData);
  }
  if (responseData.non_field_errors) {
    let str = responseData.non_field_errors.join("\n");
    throw new RequestManagerException('BACKEND_ERROR', str, responseData);
  }
  return responseData;
};

export default ResponsePrepare;
