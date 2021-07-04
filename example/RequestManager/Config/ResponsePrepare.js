
import RequestManagerException from "js-request-manager/src/Class/RequestManagerException";

// ResponsePrepare
export default {
  validate(responseData){
    // TODO: fix
    if (responseData.details) {
      throw new RequestManagerException('BACKEND_ERROR', responseData.details, responseData);
    }
    if (responseData.non_field_errors) {
      let str = responseData.non_field_errors.join("\n");
      throw new RequestManagerException('BACKEND_ERROR', str, responseData);
    }
    return responseData;
  },
};


