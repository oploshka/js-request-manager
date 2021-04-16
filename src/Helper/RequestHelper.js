import RequestLinkClass from "@requestManager/Class/RequestLinkClass";
import RequestTypePrepare from "@requestManager/Prepare/RequestTypePrepare";
import RequestUrlPrepare from "@requestManager/Prepare/RequestUrlPrepare";
import RequestDataPrepare from "@requestManager/Prepare/RequestDataPrepare";
import {isEmpty} from "@requestManager/Helper";
import RequestObjPrepare from "@requestManager/Prepare/RequestObjPrepare";

export default {
  getRequestObject({ type, url, params, fileName, options}) {

    let urlClass = new RequestLinkClass(url);
    let requestObj = {
      type  : RequestTypePrepare(type, urlClass, params),
      url   : RequestUrlPrepare(type, urlClass, params),
      data  : RequestDataPrepare(type, urlClass, params),
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

    requestObj.axios = RequestObjPrepare(requestObj.axios, {type,url,params,fileName, options});

    return requestObj;
  }
};
