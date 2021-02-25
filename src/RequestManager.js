
import RequestSchema  from "@requestManager/Configuration/RequestSchema";
import SendRequest    from '@requestManager/SendRequest';
//
import {isString, isFunction, isLiteralObject} from '@requestManager/Helper';

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

          // fix error message
          switch (true) {
            case isString(settings.errorMessage):
              if(settings.errorMessage === '') {
                settings.errorMessageFunction = (e) => { return e.message; /*toString();*/ };
              } else {
                settings.errorMessageFunction = (e) => { return settings.errorMessage + "\n\nДетали по ошибке:\n" + e.message /*toString();*/; };
              }
              break;
            case isFunction(settings.errorMessage):
              settings.errorMessageFunction = settings.errorMessage;
              break;
          }

          // fix cache
          switch (true) {
            case isString(settings.cache):
              settings.cacheFunction = (data, user) => { return settings.cache.toString(); };
              break;
            case isFunction(settings.cache):
              settings.cacheFunction = settings.cache;
              break;
          }

          /*
          return SendRequest({
            type            : requestClass.getType(),
            url             : requestClass.getUrl(),
            params          : requestClass.getParams(),
            responsePrepare : requestClass.getResponsePrepare(),
            fileName        : options.fileName ? options.fileName : requestClass.getFileName(),
            //
            cacheFunction        : cacheFun,
            errorMessageFunction : errorMessageFun,
          });
           */

          return SendRequest(settings);

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
