//
import RequestClass from "../Class/RequestClass";
//
import { isFunction, isLiteralObject} from '../Helper/Helper';
//
import { methodInfoSetSettings, methodInfoToRequestClass }  from "./SenderRequestCreate";
import SenderRequestClientLogic                             from "./SenderRequestClientLogic";
import SenderResponsePrepareLogic                           from "./SenderResponsePrepareLogic";
//
import {createSenderError}  from "./SenderHelper";
import RmCache              from "./RmCache";


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
 * @param {Object} cnf.hostAlias
 * @param {Object} cnf.Hook
 * @param {Object} cnf.RequestClientProvider
 */
const RequestManager = (schema, cnf) => {

  const RequestSchema = schema;
  const HostAlias     = cnf.hostAlias
  //
  const Cache         = cnf.rmCache || new RmCache()
  const Hook          = cnf.hook    || {}; // TODO: emitter && listener https://www.npmjs.com/package/event-emitter
  /** @type iProvider  */
  const Provider      = cnf.RequestClientProvider
  
  // соединяем ключи для имен методов
  const concatenateKey= (p, c) => { return p + '::' + c; }
  
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
  
  /**
   * функция обертка для сохранения пользовательской функции для создания информации запроса
   * @param {function(Object): MethodInfo } _rsf пользовательская функция для создания схемы запроса
   * @param {String} _mn Имя метода (генеренный)
   * @returns {function(Object=, Object=): *} Функция вызываемая при вызове метода Request Manager(а).
   */
  const createRequestSendFunction = (_rsf, _mn) => {
    
    const methodInfoConstructor = _rsf;
    const methodName              = _mn;
    
    /**
     * Формируем функцию для отправки
     * По идее это не  @constructor (понять необходимость)
     *
     * @param {Object} data     - данные для отправки
     * @param {Object} settings - доп. настройки для отправки (по мимо тех что указаны в)
     * @returns {Promise<unknown>}
     */
    const RequestSendFunction = async (data = {}, settings = null) => {
  
      // Формируем класс запроса
      let provider, requestClass;
      //
      try {
        let methodInfo = methodInfoConstructor(data);
        methodInfo = methodInfoSetSettings(methodInfo, settings, methodName);
  
        // получаем список функций обработки
        provider = RequestClientProvider.getPreset(methodInfo);
  
        // получаем финальные данные для запроса.
        requestClass = methodInfoToRequestClass(provider.MethodDataPrepare, methodInfo, HostAlias);
      } catch (e) {
        // TODO: fix - add error не удалось сформировать объект запроса
        throw createSenderError(e, 'ERROR_REQUEST_CREATE');
      }
      
      // // TODO: add cache
      // const cacheItem = Cache.getHelper(requestClass, data); // оптимизационный просчет ключей
      // if( cacheItem && cacheItem.isset() ) {
      //   return cacheItem.get();
      // }
      
      
      // Отправка данных
      let responseClass;
      //
      try {
        responseClass = await SenderRequestClientLogic(provider.RequestClient, requestClass)
      } catch (e) {
        throw createSenderError(e, 'ERROR_REQUEST_SEND');
      }
      
      
      // Обработка ответа
      let responseData
      try {
        responseData = await SenderResponsePrepareLogic(provider.ResponsePrepare, responseClass, requestClass);
      } catch (e) {
        throw createSenderError(e, 'ERROR_RESPONSE_PREPARE');
      }

  
      // TODO: add cache
      // if( cacheItem ) {
      //   return cacheItem.set( responseData );
      // }
  
  
      // TODO: продумать
      // try {
      //   Config.Hook.RequestPromise(requestPromise, mergeRequestClass);
      // } catch (e) {
      //   console.error(e);
      // }
  
      return responseData;
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
