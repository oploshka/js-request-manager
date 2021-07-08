// TODO: fix npm install
import axios from 'axios';
import {isEmpty} from "../../Helper/Helper";

export default {

  async send(obj) { return await axios(obj); },

  getRequestClientObject(requestObj, requestClass, Config) {
    const axiosObj = {
      method  : requestObj.type,
      url     : requestObj.url,
      headers : {}
    };

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

  getRMObject(axiosResponse, requestClass, Config) {


    if(!axiosResponse.response) {
      return {status: -1, contentType: '', data: {}, }
    }

    const clearContentType = (contentType) => {
      return contentType ? contentType.split(';')[0] : '';
    }

    let httpStatus  = axiosResponse.response.status ? axiosResponse.response.status : null;
    let contentType = '';
    let data        = axiosResponse.response.data ? axiosResponse.response.data : {};

    //
    if(axiosResponse.response.headers && axiosResponse.response.headers['content-type']) {
      contentType = clearContentType( axiosResponse.response.headers['content-type'] );
    }
    if(axiosResponse.response.data instanceof Blob){
      contentType = clearContentType( axiosResponse.response.data.type );
    }
    // TODO: fix httpStatus 204

    return {httpStatus: httpStatus, contentType: contentType, data: data}
  },

};
