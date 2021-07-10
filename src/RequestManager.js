//
import SendRequestClass from "./Class/SendRequestClass";
import RequestClass     from "./Class/RequestClass";
//
import {isString, isFunction, isLiteralObject} from './Helper/Helper';
import * as ConfigDefault from "./Helper/ConfigDefault";

// TODO: fix
import AxiosRequestClient from "./RequestClient/AxiosRequestClient";

/**
 * @typedef {Function} RequestSchemaFunction
 * @return {RequestClass}
 */

/**
 * @typedef {Object.<string, (RequestSchemaStr|RequestSchemaFunction)>} RequestSchemaStr
 */

/**
 * @param {Object} _configure
 * @param {RequestSchemaStr} _configure.RequestSchema
 * @param {Object} _configure.Config
 * @param {Object} _configure.Config.hostSchema
 * @param {Object} _configure.Config.RequestPrepare
 * @param {Object} _configure.Config.ResponsePrepare
 * @param {Object} _configure.Config.Hook
 */
const RequestManager = (_configure = {}) => {

  const cache = {};

  const RequestSchema = _configure.RequestSchema;
  // config
  const Config = {
    hostSchema      : Object.assign(ConfigDefault.HostSchema,      !_configure.Config ? {} : _configure.Config.hostSchema),
    RequestPrepare  : Object.assign(ConfigDefault.RequestPrepare,  !_configure.Config ? {} : _configure.Config.RequestPrepare),
    ResponsePrepare : Object.assign(ConfigDefault.ResponsePrepare, !_configure.Config ? {} : _configure.Config.ResponsePrepare),
    Hook            : Object.assign(ConfigDefault.Hook,            !_configure.Config ? {} : _configure.Config.Hook),
  };

  const RequestClient = Object.assign(AxiosRequestClient, (_configure.RequestClient || {}) );

  const SendRequest = new SendRequestClass(RequestClient, Config);

  //
  const mergeRequestClassAndRequestSettings = (requestClass, userRequestSettings) => {
    if(!userRequestSettings) {
      return requestClass;
    }
    //
    const requestClassObj = requestClass.toObject();

    return new RequestClass(Object.assign({}, requestClassObj, userRequestSettings));
  }

  const cacheCreate = (RequestClass) => {
    // Cache get
    const cacheInfo = RequestClass.getCache()
    let cacheKey = false;
    switch (true) {
      case isString(cacheInfo):
        cacheKey = cacheInfo;
        break;
      case isFunction(cacheInfo):
        cacheKey = cacheInfo(RequestClass);
        break;
    }

    // TODO: use Request Name
    if(cacheKey && cache[cacheKey]) {
      let promise = new Promise(function(promiseResolve, promiseReject) {
        // WARNING - не менять данный объект
        promiseResolve(cache[cacheKey]);
      });
      promise.abort = function(){};
      //
      return { getCache: promise};
    }

    if(cacheKey) {
      return {
        setCache(result) {
          cache[cacheKey] = result;
        },
        rejectCache() {
          delete cache[cacheKey];
        }
      }
    }

    return {};
  }

  const requestPrepare = (request) => {
    for(let key in request) {

      if ( isLiteralObject(request[key]) ) {
        request[key] = requestPrepare(request[key]);
      }

      else if ( isFunction(request[key]) ) {
        //
        const func = request[key];

        // request[key] = function (data, options = { fileName: null, cache:null, errorMessage:null }) {
        request[key] = function (requestData, userRequestSettings) {

          const requestClass = func(requestData);
          const mergeRequestClass = mergeRequestClassAndRequestSettings(requestClass, userRequestSettings);

          const cache = cacheCreate(mergeRequestClass)
          if(cache.getCache) {
            return cache.getCache();
          }

          // send request
          const requestPromise = SendRequest.send(mergeRequestClass);

          if(cache.setCache) {
            requestPromise.then(
              (result) => { cache.setCache(result); },
              (error)  => { cache.rejectCache();    }
            );
            return
          }


          try {
            Config.Hook.RequestPromise(requestPromise, mergeRequestClass);
          } catch (e){
            console.error(e);
          }

          return requestPromise;
        };
      }


    }

    return request;
  };

  const request = RequestSchema;
  requestPrepare(request);

  /**
   * for send custom user request
   * @param {String} type
   * @param {String} url
   * @param {{get: {Object}, post: {Object}}}params
   * @param {Object} options
   * @return {Promise<*>}
   */
  // request.send = async function (type, url, params, options = {}) {
  //   return SendRequest.send(
  //     new RequestClass(
  //       Object.assign({type, url, params}, options)
  //     )
  //   );
  // };

  return request;
};

export default RequestManager;
