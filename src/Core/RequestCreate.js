
//
import RequestClass     from "../Class/RequestClass";
import RequestLinkClass from "../Class/RequestLinkClass";
import MethodInfo from "js-request-manager/src/Class/MethodInfo";

/**
 * подготовка данных
 * @param {iMethodInfoPrepare} methodDataPrepare
 * @param {MethodInfo} methodInfo
 * @param {Object} hostSchema
 * @returns {Object}
 */
const getRequestObject = (methodDataPrepare, methodInfo, hostSchema) => {
  
  // данные для запроса
  const type      = methodInfo.getType();
  const url       = methodInfo.getUrl();
  const params    = methodInfo.getParams();
  
  let urlClass = new RequestLinkClass(url, hostSchema);
  return {
    type      : methodDataPrepare.prepareType(type, urlClass, params),
    url       : methodDataPrepare.prepareUrl(type, urlClass, params),
    data      : methodDataPrepare.prepareData(type, urlClass, params), // TODO: rename data -> params
  };
  
}

/**
 *
 * @param {MethodInfo}  methodInfo
 * @param {Object}      settings
 * @param {String}      methodName
 */
export const methodInfoSetSettings = (methodInfo, settings, methodName) => {
  
  // мержим доп настройки для запроса
  if(!methodInfo.getName() || settings) {
    // чтоб не писать много кода
    return new MethodInfo(Object.assign({name: methodName}, methodInfo.toObject(), settings));
  }
  
  return methodInfo;
}

/**
 *
 * @param {iMethodInfoPrepare}  methodDataPrepare
 * @param {MethodInfo}          methodInfo
 * @param {Object}              hostSchema
 * @returns {RequestClass}
 */
export const methodInfoToRequestClass = (methodDataPrepare, methodInfo, hostSchema) => {
  
  const requestObject = getRequestObject(methodDataPrepare, methodInfo, hostSchema)
  
  return new RequestClass({
    name    : methodInfo.getName(),
    //
    type    : requestObject.type,
    url     : requestObject.url,
    params  : requestObject.data, // TODO: data -> params ???
    //
    methodInfo: methodInfo
  });
}
