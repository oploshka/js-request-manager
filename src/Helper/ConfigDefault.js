
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
  //
  axiosObject(axiosObject, options) {
    return axiosObject;
  },
};

export const ResponsePrepare = {
  validate(responseData){
    // import RequestManagerException from "@requestManager/Class/RequestManagerException";
    //
    // if (responseData.details) {
    //   throw new RequestManagerException('BACKEND_ERROR', responseData.details, responseData);
    // }
    return responseData;
  },
};

export const Hook = {
  RequestPromise(requestPromise, settings) {}
};
