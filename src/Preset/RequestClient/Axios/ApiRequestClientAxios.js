
import axios from 'axios';
import {isArray, isEmpty} from '../../../Core/Is';

/**
 * @param {RequestClass} requestClass
 * @returns {Object} Произвольные данные в приемлемом формате для отправки
 */
export const requestToClientObject = (requestClass) => {
  const axiosObj = {
    method  : requestClass.getType(),
    url     : requestClass.getUrl(),
    headers : {}
  };
  // axiosObj.responseType = 'application/json';

  if (requestClass.getMethodInfo().getFileName()) { axiosObj.responseType = 'blob'; }
  const params = requestClass.getParams();
  if (!isEmpty(params.get))  { axiosObj.params  = params.get; }

  if (isArray(params.post)) {
    // fix for array send
    axiosObj.data    = JSON.stringify(params.post);// ;
    axiosObj.headers['Content-Type'] = 'application/json';
    // axiosObj.headers['Content-Length'] = 'application/json';
  } else if ( !isEmpty(params.post)) {
    // axiosObj.headers['Accept'] = 'application/json',
    axiosObj.headers['Content-Type'] = 'application/json';
    axiosObj.data    = params.post;// ;
  }

  const headerObj = requestClass.getMethodInfo().getHeader();
  for (let key in headerObj) {
    axiosObj.headers[key] = headerObj[key];
  }

  if (params.post instanceof FormData) {
    axiosObj.headers['Content-Type'] = 'multipart/form-data';
    // TODO: fix isEmpty(FormData)
    axiosObj.data    = params.post;
  }

  return axiosObj;
};

export const prepareClientObject = async(axiosObject, requestClass) => {

  let token = localStorage.getItem('user-token');
  if (token) {
    axiosObject.headers['Authorization'] = `Bearer ${token}`;
  }

  return axiosObject;
};

export const send = async(obj) => {
  return await axios(obj);
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
