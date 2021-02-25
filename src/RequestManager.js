
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

        request[key] = function (data, options = { cache:null, errorMessage:null }) {

          const requestClass = func(data);
          let   errorMessage  = (options.errorMessage !== null) ? options.errorMessage  : requestClass.getErrorMessage();
          let   cache         = (options.cache !== null)        ? options.cache         : requestClass.getCache();

          let errorMessageFun = false;
          let cacheFun        = false;

          // fix error message
          switch (true) {
            case isString(errorMessage):
              if(errorMessage === '') {
                errorMessageFun = (e) => { return e.toString(); };
              } else {
                errorMessageFun = (e) => { return errorMessage + "\n\nДетали по ошибке:\n" + e.toString(); };
              }
              break;
            case isFunction(errorMessage):
              errorMessageFun = errorMessage;
              break;
          }

          // fix cache
          switch (true) {
            case isString(cache):
              cacheFun = (data, user) => { return cache.toString(); };
              break;
            case isFunction(cache):
              cacheFun = cache;
              break;
          }

          return SendRequest({
            type            : requestClass.getType(),
            url             : requestClass.getUrl(),
            params          : requestClass.getParams(),
            responsePrepare : requestClass.getResponsePrepare(),
            fileName        : requestClass.getFileName(),
            //
            cacheFunction        : cacheFun,
            errorMessageFunction : errorMessageFun,
          });

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
