
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
  // axiosObject => requestClientDataPrepare
  requestClientDataPrepare(requestClientData, requestClass) {
    return requestClientData;
  },
};

export const ResponsePrepare = {

  isError(riObject) {
    if( !(200 <= riObject.httpStatus && riObject.httpStatus < 300) ) {
      return true;
    }
    return false;
  },

  getErrorInfo: async (ri, requestClass, Config) => {
    return null;
    // return {
    //   code: '',
    //   message: '',
    //   data: '',
    // }
  },

  getSuccessInfo: async (ri, requestClass, Config) => {
    return ri.data
  },
};

export const Hook = {
  RequestPromise(requestPromise, settings) {}
};
