// TODO: fix npm install
import fileDownload from 'js-file-download';

import RequestManagerException  from "./Class/RequestManagerException";
import ResponseHelper           from "./Helper/ResponseHelper";
import RequestLinkClass         from "./Class/RequestLinkClass";
import {isEmpty}                from "./Helper/Helper";


const sendRequestClass = function(_rc, _cnfg) {

  const RequestClient = _rc;
  const Config = _cnfg;

  this.getRequestObject = (requestClass) => {

    const type      = requestClass.getType();
    const url       = requestClass.getUrl();
    const params    = requestClass.getParams();

    let urlClass = new RequestLinkClass(url, Config.hostSchema);
    let requestObj = {
      type      : Config.RequestPrepare.type(type, urlClass, params),
      url       : Config.RequestPrepare.url(type, urlClass, params),
      data      : Config.RequestPrepare.data(type, urlClass, params),
    };

    const requestClientData = RequestClient.getRequestClientObject(requestObj, requestClass)
    // TODO rename axiosObject => requestClientDataPrepare
    requestObj.requestClientData = Config.RequestPrepare.axiosObject(requestClientData, requestClass);
    return requestObj;
  };


  this.send = async (requestClass) => {

    let requestObject;
    try {
      requestObject = this.getRequestObject(requestClass);
    } catch (e) {
      let promise = Promise.reject(new RequestManagerException('REQUEST_OBJECT_PREPARE', e.message, {errorObject: e}));
      promise.abort = () => {};
      return promise;
    }

    let request = null;

    // eslint-disable-next-line no-async-promise-executor
    let promise = new Promise(async function(promiseResolve, promiseReject) {
      try {
        let responseObject = {
          clientRequest   : requestObject,
          clientResponse  : null,
          httpStatus      : 0,
          contentType     : null,
          isValid         : true
        };

        try {
          responseObject.clientResponse = await RequestClientHelper.send(requestObject.clientRequest)
        } catch (error) {
          responseObject.isValid = false;
          responseObject.clientResponse = error;
        }

        responseObject.httpStatus  = RequestClientHelper.getHttpStatus(responseObject.clientResponse);

        // TODO: add clear content type function
        responseObject.contentType = RequestClientHelper.getContentType(responseObject.clientResponse);

        if(responseObject.isValid) {
          // TODO: продумать функцию isError
          responseObject.isValid = !RequestClientHelper.isError(responseObject.clientResponse);
        }



        if(!responseObject.isValid) {
          let res = await RequestClientHelper.errorConvert(responseObject.clientResponse, Config);
          promiseReject( res );
          return;
        }


        if(responseObject.contentType === 'application/json') {

          let _data = await ResponseHelper.getDataPromise(responseObject.axios);
          _data = Config.ResponsePrepare.validate(_data);
          if(requestInfo.userResponseDataPrepare) {
            _data = requestInfo.userResponseDataPrepare(_data);
          }
          promiseResolve(_data);
          return;
        }

        if(responseObject.axios.data instanceof Blob) {
          let contentType = responseObject.axios.data.type;
          fileDownload(responseObject.axios.data, fileName, contentType);
          promiseResolve({}); // TODO test and add data
          return;
        }

        // fix пустого ответа сервера
        if(responseObject.httpStatus === 204) {
          promiseResolve({});
          return;
        }

        promiseReject(new RequestManagerException('UNDEFINED_CONTENT_TYPE', 'Undefined content type', responseObject));

      } catch (error) {

        let returnError = error;
        if (!(returnError instanceof RequestManagerException)) {
          returnError = new RequestManagerException('ERROR_UNDEFINED', '', returnError);
        }
        promiseReject(returnError);

        // let returnError = await ErrorPrepare(error);
        // promiseReject(returnError);
      }
    });

    promise.abort = function(){
      // TODO: fix message notification
      request && request.abort && request.abort();
    };

    return promise;
  };

};

export default RequestLinkClass;
