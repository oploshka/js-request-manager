
//
import RequestMergeClass  from "../Class/RequestSchemaMergeClass";
import RequestLinkClass   from "../Class/RequestLinkClass";

// подготовка данных
const getRequestObject = (requestClass, hostSchema) => {
  
  // данные для запроса
  const type      = requestClass.getType();
  const url       = requestClass.getUrl();
  const params    = requestClass.getParams();
  
  let urlClass = new RequestLinkClass(url, hostSchema);
  return {
    type      : requestPrepare.type(type, urlClass, params),
    url       : requestPrepare.url(type, urlClass, params),
    data      : requestPrepare.data(type, urlClass, params),
  };
  
}

// TODO: переписать логику мержа
const mergeRequestClassAndRequestSettings = (requestClass, userRequestSettings) => {
  if(!userRequestSettings) {
    return requestClass;
  }
  //
  const requestClassObj = requestClass.toObject();
  
  return new RequestSchemaMergeClass(Object.assign({}, requestClassObj, userRequestSettings));
}

export default mergeRequestClassAndRequestSettings;