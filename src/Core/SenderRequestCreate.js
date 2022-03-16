
//
import RequestClass     from '../Class/RequestClass';
import RequestLinkClass from '../Class/RequestLinkClass';
import MethodInfo       from '../Class/MethodInfo';

/**
 * подготовка данных
 * @param {testServerMethodInfoPrepare} methodInfoPrepare
 * @param {MethodInfo} methodInfo
 * @param {Object} hostAlias
 * @returns {Object}
 */
const getRequestObject = (methodInfoPrepare, methodInfo, hostAlias) => {
  
  // данные для запроса
  const type      = methodInfo.getType();
  const url       = methodInfo.getUrl();
  const params    = methodInfo.getParams();
  
  let urlClass = new RequestLinkClass(url, hostAlias);
  return {
    type      : methodInfoPrepare.prepareType(type, urlClass, params),
    url       : methodInfoPrepare.prepareUrl(type, urlClass, params),
    data      : methodInfoPrepare.prepareData(type, urlClass, params), // TODO: rename data -> params
  };
  
};

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
};

/**
 *
 * @param {testServerMethodInfoPrepare}  methodInfoPrepare
 * @param {MethodInfo}          methodInfo
 * @param {Object}              hostAlias
 * @returns {RequestClass}
 */
export const methodInfoToRequestClass = (methodInfoPrepare, methodInfo, hostAlias) => {
  
  const requestObject = getRequestObject(methodInfoPrepare, methodInfo, hostAlias)
  
  return new RequestClass({
    name    : methodInfo.getName(),
    //
    type    : requestObject.type,
    url     : requestObject.url,
    params  : requestObject.data, // TODO: data -> params ???
    //
    methodInfo: methodInfo
  });
};
