
// RequestPrepare
export default {
  data(requestType, requestUrl, requestData){
    return requestData;
  },
  type(requestType, requestUrl, requestData) {
    if (requestType === 'JSON-TEST') {
      requestType = 'GET';
    }
    return requestType;
  },
  url(requestType, requestUrl, requestData) {
    return requestUrl.getUrl();
  },
  //
  requestClientDataPrepare(axiosObject, options) {
    //
    let token = localStorage.getItem('user-token');
    if(token) {
      axiosObject.headers['Authorization'] = `Token ${token}`;
    }
    //
    return axiosObject;
  },
};
