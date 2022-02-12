
import {isEmpty} from "../Helper/Helper";

// import axios from 'axios';
// async send(obj) { return await axios(obj); },
export const send = async(obj) => {
  return Promise.reject('NOT INIT RequestClient send function');
};

export const sendPrepare = async(axiosObject, options) => {
  //
  // let token = localStorage.getItem('user-token');
  // if(token) {
  //   axiosObject.headers['Authorization'] = `Token ${token}`;
  // }
  //
  return axiosObject;
};

export const getRequestClientObject = (requestObj, requestClass, Config) => {
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
};

export const isNetworkError = (axiosResponse, requestClass, Config) => {
  // if(!axiosResponse.status /* axiosResponse.isAxiosError &&  !axiosResponse.response */ ) {
  if( !(axiosResponse.request && axiosResponse.request.status) ) {
    return axiosResponse.message ? axiosResponse.message : 'Неизвестная сетевая ошибка';
  }
};

export const getRiObject = async (axiosResponse, requestClass, Config) => {
  // httpStatus 204 - empty response and not content type!!!
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
    
    // fix file load error
    if( ri.contentType === 'application/json'){
      ri.data = await ri.data.text().then(text => JSON.parse(text));
    }
  }
  
  return ri;
};
