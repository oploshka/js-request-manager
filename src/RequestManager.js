
import RequestSchema  from "@requestManager/Configuration/RequestSchema";
import SendRequest    from '@requestManager/SendRequest';
//
import {isString, isFunction, isLiteralObject} from '@requestManager/Helper';
//
import ShowErrorMessage   from '@requestManager/User/ShowErrorMessage';
import GetErrorMessage    from "@requestManager/User/GetErrorMessage";

const cache = {};

const RequestManager = () => {

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

          // send request
          const requestPromise = SendRequest(settings);

          // TODO: fix
          if(window.VueApp) {
            window.VueApp.$store.dispatch('loading/addRequest', requestPromise);
          }

          requestPromise.then(
            (result) => {
              // cache save
              if(cacheKey) {
                cache[cacheKey] = result;
              }
            },
            (error) => {
              // error message
              let message = GetErrorMessage(settings.errorMessage, error);
              message && ShowErrorMessage(message);
            });

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
