//
import SendRequest    from './SendRequest';
import {isString, isFunction, isLiteralObject} from './Helper/Helper';
import * as ConfigDefault from "./Helper/ConfigDefault";

const cache = {};

/*
{
  RequestSchema,

  // configuration
  hostSchema = {},
  RequestPrepare= {},
  ResponsePrepare= {},
  Hook = {},
}
**/
const RequestManager = (_configure) => {

  const RequestSchema = _configure.RequestSchema;
  // config
  const Config = {
    hostSchema      : Object.assign(ConfigDefault.HostSchema,      _configure.Config.hostSchema),
    RequestPrepare  : Object.assign(ConfigDefault.RequestPrepare,  _configure.Config.RequestPrepare),
    ResponsePrepare : Object.assign(ConfigDefault.ResponsePrepare, _configure.Config.ResponsePrepare),
    Hook            : Object.assign(ConfigDefault.Hook,            _configure.Config.Hook),
  };

  const requestPrepare = (request) => {
    for(let key in request) {

      if ( isLiteralObject(request[key]) ) {
        request[key] = requestPrepare(request[key]);
      }

      else if ( isFunction(request[key]) ) {
        //
        const func = request[key];

        request[key] = function (data, options = { fileName: null, cache:null, errorMessage:null }) {

          const requestClass = func(data);
          //
          const settings = requestClass.toObject();
          for (var key in settings) {
            if (options[key]) settings[key] = options[key];
          }
          // TODO: delete fix!!!
          settings.userResponseDataPrepare = settings.responsePrepare;

          // cache get
          let cacheKey = false;
          switch (true) {
            case isString(settings.cache):
              cacheKey = settings.cache;
              break;
            case isFunction(settings.cache):
              cacheKey = settings.cache(data);
              break;
          }
          if(cacheKey && cache[cacheKey]) {
            let promise = new Promise(function(promiseResolve, promiseReject) {
              // WARNING - не менять данный объект
              promiseResolve(cache[cacheKey]);
            });
            promise.abort = function(){};
            return promise;
          }

          // TODO: fix
          settings.options = options;

          // send request
          const requestPromise = SendRequest(settings, Config);

          requestPromise.then(
            (result) => {
              // cache save
              if(cacheKey) {
                cache[cacheKey] = result;
              }
            },
            (error) => {
              //
            }
          );

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

  return request;
};

export default RequestManager;
