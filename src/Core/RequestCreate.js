
//
import RequestClass     from "../Class/RequestClass";
import RequestLinkClass from "../Class/RequestLinkClass";

/**
 * подготовка данных
 * @param {MethodSchema} methodSchema
 * @param {Object}       userRequestSettings
 * @returns {RequestSchemaMergeClass|*}
 */
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

/**
 * TODO: переписать логику мержа
 *
 * @param {MethodSchema} methodSchema
 * @param {Object}       userRequestSettings
 * @returns {RequestSchemaMergeClass|*}
 */
const requestClassCreate = (methodSchema, userRequestSettings) => {
  if(!userRequestSettings) {
    return requestClass;
  }
  //
  const requestClassObj = requestClass.toObject();
  
  return new RequestClass(Object.assign({}, requestClassObj, userRequestSettings));
}

export default mergeRequestClassAndRequestSettings;