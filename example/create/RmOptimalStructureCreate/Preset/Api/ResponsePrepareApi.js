
import getErrorHandlerList from "./ResponseGetError";

// ResponsePrepare
export default {
  
  getErrorNetworkMessage() {
  
  },
  
  // Ответ успешный
  isSuccess(riObject) {
    if( !(200 <= riObject.httpStatus && riObject.httpStatus < 300) ) {
      return false;
    }
    return true;
  },

  getErrorHandlerList: getErrorHandlerList,

  getSuccessInfo: async (riObject, requestClass, Config) => {
    return riObject.data
  },
};


