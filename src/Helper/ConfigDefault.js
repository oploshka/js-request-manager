
export const HostSchema = {
  http : 'http://',
  https: 'https://',
};

export const RequestPrepare = {
  data(requestType, requestUrl, requestData){
    return requestData;
  },
  type(requestType, requestUrl, requestData) {
    return requestType;
  },
  url(requestType, requestUrl, requestData) {
    return requestUrl.getUrl();
  },
  requestClientDataPrepare(requestClientData, requestClass) {
    return requestClientData;
  },
};

export const ResponsePrepare = {

  isError(riObject) {
    if( !(200 <= riObject.httpStatus && riObject.httpStatus < 300) ) {
      return true;
    }
    
    // TODO: продумать ситуации когда ожидается файл!!!
    //   if(!requestClass.getFileName()){
    //     if( !riObject.data || !riObject.data.success ) {
    //       return true;
    //     }
    //   }
    
    return false;
  },

  getErrorInfo: async (riObject, requestClass, Config) => {
    return {
      code: 'error',
      message: riObject.data.error || 'Неизвестная ошибка',
      data: riObject,
    }
  },

  getSuccessInfo: async (riObject, requestClass, Config) => {
    return riObject.data
  },
};

export const Hook = {
  RequestPromise(requestPromise, settings) {}
};
