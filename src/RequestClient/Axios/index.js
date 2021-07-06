// TODO: fix npm install
import axios from 'axios';
import {isEmpty} from "../../Helper/Helper";
import AxiosErrorConvert from "./AxiosErrorConvert";
import ResponseHelper from "./ResponseHelper";

export default {
  // TODO: fix
  ...ResponseHelper,
  errorConvert: AxiosErrorConvert,

  async send(obj) { return axios(obj); },

  getRequestClientObject(requestObj, requestClass) {
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

};
