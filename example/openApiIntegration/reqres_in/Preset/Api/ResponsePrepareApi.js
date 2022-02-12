
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
  // TODO: упростить в 1 метод?
  getSuccessInfo: async (riObject, requestClass, Config) => {
    
    let data = riObject.data;
    
    //
    if(data instanceof Blob) {
      // data = await RequestClient.fileDownload(data, ri, requestClass, Config);
      return {};
    }
    return data;
  },

  getErrorHandlerList: getErrorHandlerList,

};


