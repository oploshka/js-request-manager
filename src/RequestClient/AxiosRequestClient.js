
import {isEmpty} from "../Helper/Helper";

export default {

  async send(obj) {
    // // TODO: fix npm install
    // import axios from 'axios';
    //  async send(obj) { return await axios(obj); },
    return Promise.reject('NOT INIT RequestClient send function');
  },

  getRequestClientObject(requestObj, requestClass, Config) {
    const axiosObj = {
      method  : requestObj.type,
      url     : requestObj.url,
      headers : {}
    };
    // axiosObj.responseType = 'application/json';

    if(requestClass.getFileName()){
      axiosObj.responseType = 'blob';
    }

    if(!isEmpty(requestObj.data.get)){
      axiosObj.params  = requestObj.data.get;
    }

    if(!isEmpty(requestObj.data.post)){
      axiosObj.data    = requestObj.data.post;
    }

    if(requestObj.data.post instanceof FormData){
      axiosObj.data    = requestObj.data.post;
      axiosObj.headers['Content-Type'] = 'multipart/form-data';
    }

    return axiosObj;
  },


  isNetworkError(axiosResponse, requestClass, Config) {
    if(/* axiosResponse.isAxiosError && */ !axiosResponse.response) {
      return axiosResponse.message ? axiosResponse.message : 'Неизвестная сетевая ошибка';
    }
  },

  getRiObject(axiosResponse, requestClass, Config) {

    const ri = {
      httpStatus  : -1,
      contentType : '',
      data        : {},
      headers     : {}
    }
    const clearContentType = (contentType) => {
      return contentType ? contentType.split(';')[0] : '';
    }

    // get status
    if(axiosResponse.status) {
      ri.httpStatus = axiosResponse.status;
    } else if(axiosResponse.request &&  axiosResponse.request.status) {
      ri.httpStatus = axiosResponse.request.status;
    }

    // get headers
    if(axiosResponse.headers) {
      ri.headers = axiosResponse.headers;
    } else if(axiosResponse.response &&  axiosResponse.response.headers) {
      ri.headers = axiosResponse.response.headers;
    }

    // get contentType
    if( ri.headers['content-type']) {
      ri.contentType = clearContentType( ri.headers['content-type'] );
    }

    // get data
    if(axiosResponse.data){
      ri.data = axiosResponse.data;
    } else if(axiosResponse.response &&  axiosResponse.response.data) {
      ri.data = axiosResponse.response.data;
    } else if(axiosResponse.request &&  axiosResponse.request.response) {
      ri.data = axiosResponse.request.response;
    }

    if(ri.data instanceof Blob){
      ri.contentType = clearContentType( ri.data.type );
    }

    // TODO: fix httpStatus 204
    return ri;
  },

};
