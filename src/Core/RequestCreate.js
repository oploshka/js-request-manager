
//
import RequestClass     from "../Class/RequestClass";
import RequestLinkClass from "../Class/RequestLinkClass";
import MethodSchema from "js-request-manager/src/Class/MethodSchema";

/**
 * подготовка данных
 * @param {iMethodSchemaPrepare} methodDataPrepare
 * @param {MethodSchema} methodSchema
 * @param {Object} hostSchema
 * @returns {Object}
 */
const getRequestObject = (methodDataPrepare, methodSchema, hostSchema) => {
  
  // данные для запроса
  const type      = methodSchema.getType();
  const url       = methodSchema.getUrl();
  const params    = methodSchema.getParams();
  
  let urlClass = new RequestLinkClass(url, hostSchema);
  return {
    type      : methodDataPrepare.prepareType(type, urlClass, params),
    url       : methodDataPrepare.prepareUrl(type, urlClass, params),
    data      : methodDataPrepare.prepareData(type, urlClass, params), // TODO: rename data -> params
  };
  
}

/**
 * TODO: переписать логику мержа
 *
 * @param {iMethodSchemaPrepare} methodDataPrepare
 * @param {MethodSchema} methodSchema
 * @param {String}       methodName
 * @param {Object}       hostSchema
 * @param {Object}       customSettings
 * @returns {RequestClass}
 */
const requestClassCreate = (methodDataPrepare, methodSchema, methodName, hostSchema, customSettings) => {
  
  let fixMethodSchema = methodSchema;
  
  // мержим доп настройки для запроса
  if(customSettings) {
    // чтоб не писать много кода
    fixMethodSchema = new MethodSchema(Object.assign({}, methodSchema.toObject(), customSettings));
  }
  
  const requestObject = getRequestObject(methodDataPrepare, fixMethodSchema, hostSchema)
  const methodSchemaName = fixMethodSchema.getName();
  
  return new RequestClass({
    name    : methodSchemaName || methodName,
    //
    type    : requestObject.type,
    url     : requestObject.url,
    params  : requestObject.data, // TODO: data -> params ???
    //
    methodSchema: fixMethodSchema
  });
}

export default requestClassCreate;