
export default {

  getHttpStatus(axiosResponse) {
    return axiosResponse.status ? axiosResponse.status : null;
  },

  isError(axiosResponse) {
    let httpStatus = this.getHttpStatus(axiosResponse);
    return !(200 <= httpStatus && httpStatus < 300);
  },

  getContentType(axiosResponse) {
    let contentType = 'text/plain';

    if(axiosResponse && axiosResponse.headers && axiosResponse.headers['content-type']) {
      contentType = axiosResponse.headers['content-type'].split(';')[0];
    }
    if(axiosResponse && axiosResponse.data instanceof Blob){
      contentType = axiosResponse.data.type;
    }
    return contentType;
  },

  getDataPromise(axiosResponse) {
    let responseContentType = this.getContentType(axiosResponse);

    //
    if(axiosResponse.data instanceof Blob && axiosResponse.data.type === 'application/json') {
      return axiosResponse.request.response.text().then(text => JSON.parse(text));
    }
    //
    if(responseContentType === 'application/json') {
      return Promise.resolve(axiosResponse.data);
    }

    return Promise.resolve({});
  },
};
