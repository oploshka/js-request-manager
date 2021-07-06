//
import SendRequestClass from "./SendRequestClass";
import RequestClass   from "./Class/RequestClass";
//
import {isString, isFunction, isLiteralObject} from './Helper/Helper';
import * as ConfigDefault from "./Helper/ConfigDefault";

// TODO: fix
import RequestClientAxios from "./RequestClient/Axios";

/**
 * @param _configure {{
 *   RequestSchema: Object,
 *   Config: {
 *     hostSchema: Object,
 *     RequestPrepare: {
 *       data: Function,
 *       type: Function,
 *       url: Function,
 *       axiosObject: Function,
 *     },
 *     ResponsePrepare: {
 *       validate: Function,
 *     },
 *     Hook: {
 *       RequestPromise: Function
 *     }
 *   }
 * }}
 */
const RequestManager = (_configure) => {

  const cache = {};

  const RequestSchema = _configure.RequestSchema;
  // config
  const Config = {
    hostSchema      : Object.assign(ConfigDefault.HostSchema,      _configure.Config.hostSchema),
    RequestPrepare  : Object.assign(ConfigDefault.RequestPrepare,  _configure.Config.RequestPrepare),
    ResponsePrepare : Object.assign(ConfigDefault.ResponsePrepare, _configure.Config.ResponsePrepare),
    Hook            : Object.assign(ConfigDefault.Hook,            _configure.Config.Hook),
  };
  // TODO: fix
  const RequestClient = _configure.RequestClient ? _configure.RequestClient : RequestClientAxios;

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
            Config.Hook.RequestPromise(requestPromise, settings);
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

  // TODO fix for Request Manager - need test
  // request.send = async (obj) => {
  //   return SendRequest.send(new RequestClass(obj));
  // };

  return request;
};

export default RequestManager;
