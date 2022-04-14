
import {isEmpty} from '../../../Core/Is';
import JsonToFormData from '../../../Utils/JsonToFormData';

/**
 * @param {RequestClass} requestClass
 * @returns {Object} Произвольные данные в приемлемом формате для отправки
 */
export const requestToClientObject = (requestClass) => {
  const axiosObj = {
    method  : requestClass.getType(),
    url     : requestClass.getUrl(),
    headers : {
      'Content-Type': 'multipart/form-data'
    }
  };
  // axiosObj.responseType = 'application/json';
  
  if(requestClass.getMethodInfo().getFileName())     { axiosObj.responseType = 'blob'; }
  const params = requestClass.getParams()
  if(!isEmpty(params.get))  { axiosObj.params  = params.get; }
  if(!isEmpty(params.post)) { axiosObj.data    = JsonToFormData(params.post); }
  
  return axiosObj;
};

export const prepareClientObject = async(axiosObject, requestClass) => {
  //
  // let token = localStorage.getItem('user-token');
  // if(token) {
  //   axiosObject.headers['Authorization'] = `Token ${token}`;
  // }
  //
  return axiosObject;
};

export const send = async(obj) => {
  if(global.axios) {
    return await global.axios(obj);
  } else {
    // throw new RequestManagerException('AXIOS_IS_NOT_GLOBAL', '', {});
    return Promise.reject('Undefined global.axios');
  }
};


export const isNetworkError = (axiosResponse, requestClass, Config) => {
  // if(!axiosResponse.status /* axiosResponse.isAxiosError &&  !axiosResponse.response */ ) {
  if( !(axiosResponse.request && axiosResponse.request.status) ) {
    return axiosResponse.message ? axiosResponse.message : 'Неизвестная сетевая ошибка';
  }
};

export const clientResponseToObject = async (axiosResponse, requestClass, Config) => {
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
