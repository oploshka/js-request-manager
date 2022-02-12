
import {isEmpty} from "../Helper/Helper";

export const send = async(obj) => {
  return await fetch(obj.url, obj.options);
};

export const sendPrepare = async(fetchObject, options) => {
  return fetchObject;
};

export const getRequestClientObject = (requestObj, requestClass, Config) => {
  
  let fetchUrl = requestObj.url;
  
  // get params
  if(!isEmpty(requestObj.data.get)){
    let params = '';
    for(let key in requestObj.data.get){
      if(requestObj.data.get[key] === null) {
        continue;
      }
      params += (params ? '&' : '') + encodeURIComponent(key) + '=' + encodeURIComponent(requestObj.data.get[key])
    }
    
    if (fetchUrl.includes("?")){
      fetchUrl += (params ? '&' : '') + params;
    } else {
      fetchUrl += (params ? '?' : '') + params;
    }
  }
  
  const fetchOptions = {
    method  : requestObj.type, // *GET, POST, PUT, DELETE, etc.
    headers : {},
    
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *client
  };
  
  if(!isEmpty(requestObj.data.post)){
    
    if(requestObj.data.post instanceof FormData){
      fetchOptions.headers['Content-Type'] = 'multipart/form-data';
      fetchOptions.body    = requestObj.data.post;
    } else {
      fetchOptions.headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(requestObj.data.post)
    }
  }
  
  
  // if(requestClass.getFileName()){
  //   axiosObj.responseType = 'blob';
  // }
  //
  
  return {url: fetchUrl, options: fetchOptions};
};

export const isNetworkError = (axiosResponse, requestClass, Config) => {
  if(!fetchResponse.ok) {
    return fetchResponse.statusText ? fetchResponse.statusText : 'Неизвестная сетевая ошибка';
  }
};

export const getRiObject = async (axiosResponse, requestClass, Config) => {
  
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
  if(fetchResponse.status) {
    ri.httpStatus = fetchResponse.status;
  } else if(fetchResponse.request &&  fetchResponse.request.status) {
    ri.httpStatus = fetchResponse.request.status;
  }
  
  // get headers
  if(fetchResponse.headers) {
    for (let pair of fetchResponse.headers.entries()) {
      // console.log(pair[0]+ ': '+ pair[1]);
      ri.headers[pair[0]] = pair[1]
    }
    // ri.headers = fetchResponse.headers;
  }
  
  // get contentType
  if( ri.headers['content-type']) {
    ri.contentType = clearContentType( ri.headers['content-type'] );
  }
  
  // get data
  if(ri.contentType === 'application/json') {
    try {
      const json = await fetchResponse.json();
      ri.data = json;
    } catch (e){
      console.warn(e);
    }
  }
  else if(ri.contentType === 'text/plain') {
    try {
      const text = await fetchResponse.text();
      ri.data = text;
    } catch (e){
      console.warn(e);
    }
  }
  // else if(ri.contentType = 'TODO_FIX_FILE') {
  //   try {
  //     const json = await fetchResponse.blob();
  //     ri.data = json;
  //   } catch (e){
  //     console.warn(e);
  //   }
  // }
  
  // if(fetchResponse.data){
  //   ri.data = fetchResponse.data;
  // } else if(fetchResponse.request &&  fetchResponse.request.response) {
  //   ri.data = fetchResponse.request.response;
  // }
  
  //
  // if(ri.data instanceof Blob){
  //   ri.contentType = clearContentType( ri.data.type );
  // }
  
  // TODO: fix httpStatus 204
  return ri;
};
