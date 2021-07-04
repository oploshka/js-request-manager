import RequestLinkClass from "@requestManager/Class/RequestLinkClass";
import {isEmpty} from "@requestManager/Helper/Helper";

export default {
  getRequestObject({ type, url, params, fileName, options}, Config) {

    let urlClass = new RequestLinkClass(url, Config.hostSchema);
    let requestObj = {
      type  : Config.RequestPrepare.type(type, urlClass, params),
      url   : Config.RequestPrepare.url(type, urlClass, params),
      data  : Config.RequestPrepare.data(type, urlClass, params),
    };

    // axios
    requestObj.axios = {
      method  : requestObj.type,
      url     : requestObj.url,
      headers : {}
    };

    if(fileName){
      requestObj.axios.responseType = 'blob';
    }
    if(!isEmpty(requestObj.data.get)){
      requestObj.axios.params  = requestObj.data.get;
    }

    if(!isEmpty(requestObj.data.post)){
      requestObj.axios.data    = requestObj.data.post;
    }

    if(requestObj.data.post instanceof FormData){
      requestObj.axios.data    = requestObj.data.post;
      requestObj.axios.headers['Content-Type'] = 'multipart/form-data';
    }

    requestObj.axios = Config.RequestPrepare.axiosObject(requestObj.axios, {type,url,params,fileName, options});

    return requestObj;
  }
};
