
// import HostSchema     from "@requestManager/Configuration/HostSchema";
import RequestSchema  from "@requestManager/Configuration/RequestSchema";

import SendRequest    from '@requestManager/SendRequest';

const RequestManager = () => {

  /*
  const isArray = function(a) {
    return (!!a) && (a.constructor === Array);
  };
  */
  const isString = function(f) {
    return typeof f === 'string';
  };
  const isFunction = function(f) {
    return typeof f === 'function';
  };
  const isLiteralObject = function(a) {
    return (!!a) && (a.constructor === Object);
  };

  const requestPrepare = (request) => {
    for(let key in request) {
      if ( isFunction(request[key]) ) {
        //
        const func = request[key];
        // const funcArgCount = func.length;

        request[key] = function () {
          // TODO test function argument count
          // if(arguments.length < funcArgCount) {
          //   console.warn('arguments length error');
          // }

          const requestClass = func(...arguments);


          const resultSendRequest = SendRequest(
            requestClass.getType(),
            requestClass.getUrl(),
            requestClass.getParams(),
            requestClass.getResponsePrepare(),
            requestClass.getFileName(),
          ).catch((e) => {

            let errorMessage = requestClass.getErrorMessage();

            if( isString(errorMessage) ) {
              if(errorMessage === '') {
                errorMessage = e.toString()
              } else {
                errorMessage = errorMessage + "\n\nДетали по ошибке:\n" + e.toString();
              }
            }

            else if( isFunction(errorMessage) ) {
              errorMessage = errorMessage(e);
            }

            global.VueApp && global.VueApp.$dialogs && global.VueApp.$dialogs.alert(errorMessage, {title: 'Ошибка'});

            return Promise.reject(e);
          });

          return resultSendRequest;

        }
      }

      else if ( isLiteralObject(request[key]) ) {
        request[key] = requestPrepare(request[key]);
      }

    }

    return request;
  }

  const request = RequestSchema;
  requestPrepare(request)

  return request
};

export default RequestManager;
