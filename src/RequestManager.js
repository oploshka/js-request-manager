//
import SendRequestClass from "./Class/SendRequestClass";
import RequestClass     from "./Class/RequestClass";
//
import { mergeRequestClassAndRequestSettings, cacheCreate} from "./Helper/Function";
import { isFunction, isLiteralObject} from './Helper/Helper';
import * as ConfigDefault from "./Helper/ConfigDefault";

/**
 * @typedef {Function} RequestSchemaFunction
 * @return {RequestClass}
 */

/**
 * @typedef {Object.<string, RequestSchemaFunction|RequestSchemaStr>} RequestSchemaStr
 */

/**
 * @param {RequestSchemaStr} schema
 * @param {Object} cnf
 * @param {Object} cnf.hostSchema
 * @param {Object} cnf.Hook
 * @param {Object} cnf.RequestClientProvider
 */
const RequestManager = (schema, cnf = {}) => {

  const cache = {};

  const RequestSchema = schema;
  const RequestClientProvider = cnf.RequestClientProvider
  // config
  const Config = {
    hostSchema      : Object.assign(ConfigDefault.HostSchema,      cnf.hostSchema),
    Hook            : Object.assign(ConfigDefault.Hook,            cnf.Hook),
  };

  // Создаем функцию для отправки
  const SendRequest = new SendRequestClass(RequestClientProvider, Config);
  
  // соединяем ключи для имен методов
  const concatenateKey= (p, c) => {
    return p + '::' + c;
  }
  
  // Тут мы перебираем все элементы и генерим по ним менеджер запросов
  const requestPrepare = (requestSchema, parentKey = '') => {
    const req1 = {};
    for(let key in requestSchema) {
      if ( isLiteralObject(requestSchema[key]) ) {
        req1[key] = requestPrepare(requestSchema[key], concatenateKey(parentKey, key) );
      }
      else if ( isFunction(requestSchema[key]) ) {
        // request[key] = function (data, options = { fileName: null, cache:null, errorMessage:null }) {
        req1[key] = createRequestSendFunctionQQ(requestSchema[key], concatenateKey(parentKey, key) )
      }
    }
    return req1
  };
  
  // функция обертка для сохранения
  const createRequestSendFunctionQQ = (_rsf, _mn) => {
    //
    const requestSchemaFunction = _rsf;
    const methodName            = _mn;
    
    // Формируем функцию для отправки
    const RequestSendFunction = (requestData, userRequestSettings) => {
      const requestClass = requestSchemaFunction(requestData);
      const mergeRequestClass = mergeRequestClassAndRequestSettings(requestClass, userRequestSettings);

      // TODO: продумать кеш
      // const cache = cacheCreate(mergeRequestClass)
      // if (cache.getCache) {
      //   return cache.getCache();
      // }
  
      // send request
      const requestPromise = SendRequest.send(mergeRequestClass);
  
      // TODO: продумать кеш
      // if (cache.setCache) {
      //   requestPromise.then(
      //     (result) => {
      //       cache.setCache(result);
      //     },
      //     (error) => {
      //       cache.rejectCache();
      //     }
      //   );
      //   return
      // }
  
  
      try {
        Config.Hook.RequestPromise(requestPromise, mergeRequestClass);
      } catch (e) {
        console.error(e);
      }
  
      return requestPromise;
    }
    return RequestSendFunction;
    
  }
  
  ///////////////////////////////////////////////////////////
  
  
  
  
  
  
  
  
  const request = requestPrepare(RequestSchema);

  /**
   * for send custom user request
   * @param {String} type
   * @param {String} url
   * @param {{get: {Object}, post: {Object}}}params
   * @param {Object} options
   * @return {Promise<*>}
   */
  request.send = async function (type, url, params, options = {}) {
    return SendRequest.send(
      new RequestClass(
        Object.assign({type, url, params}, options)
      )
    );
  };

  return request;
};

export default RequestManager;
