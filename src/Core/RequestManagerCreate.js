//
import Sender       from "./Sender";
import RequestClass from "../Class/RequestClass";
//
import { isFunction, isLiteralObject} from '../Helper/Helper';
import { methodInfoSetSettings, methodInfoToRequestClass } from "./RequestCreate";


/**
 * @typedef {Function} RequestSchemaFunction
 * @return {RequestClass}
 */

/**
 * @typedef {Object.<string, RequestSchemaFunction|RequestSchemaStr>} RequestSchemaStr
 */

/**
 *
 * @param {RequestSchemaStr} schema
 * @param {Object} cnf
 * @param {Object} cnf.hostSchema
 * @param {Object} cnf.Hook
 * @param {Object} cnf.RequestClientProvider
 */
const RequestManager = (schema, cnf) => {

  const cache = {};

  const RequestSchema = schema;
  
  /**
   *
   * @type iProvider
   */
  const RequestClientProvider = cnf.RequestClientProvider
  // config
  const Config = {
    hostSchema      : Object.assign({}, cnf.hostSchema),
    Hook            : Object.assign({}, cnf.hook),
  };

  // // Создаем функцию для отправки
  // const SendRequest = new SendRequestClass(RequestClientProvider, Config);
  
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
        req1[key] = createRequestSendFunction(requestSchema[key], concatenateKey(parentKey, key) )
      }
    }
    return req1
  };
  
  // функция обертка для сохранения
  const createRequestSendFunction = (_rsf, _mn) => {
    /**
     * пользовательская функция для создания схемы запроса
     * @type {function(Object): MethodInfo }
     **/
    const methodInfoConstructor = _rsf;
    
    /**
     * Имя метода (генеренный)
     * @type String
     **/
    const methodName              = _mn;
    
    /**
     * Формируем функцию для отправки
     * По идее это не  @constructor (понять необходимость)
     *
     * @param {Object} data     - данные для отправки
     * @param {Object} settings - доп. настройки для отправки (по мимо тех что указаны в)
     * @returns {Promise<unknown>}
     */
    const RequestSendFunction = (data = {}, settings = {}) => {
      
      let provider;
      let requestClass;
      
      try {
        // получаем не данные запроса
        let methodInfo = methodInfoConstructor(data);
        methodInfo = methodInfoSetSettings(methodInfo, settings, methodName);
  
        // получаем список функций обработки
        provider = RequestClientProvider.getPreset(methodInfo);
  
        // получаем финальные данные для запроса.
        requestClass = methodInfoToRequestClass(provider.MethodDataPrepare, methodInfo, Config.hostSchema);
      } catch (e) {
        console.error(e);
        // TODO: fix
        return Promise.reject({})
      }

      // TODO: продумать кеш
      // const cache = cacheCreate(mergeRequestClass)
      // if (cache.getCache) {
      //   return cache.getCache();
      // }
  
      // send request
      const requestPromise = Sender(provider.RequestClient, provider.ResponsePrepare, requestClass);
  
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
  
  
      // TODO: продумать
      // try {
      //   Config.Hook.RequestPromise(requestPromise, mergeRequestClass);
      // } catch (e) {
      //   console.error(e);
      // }
  
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
