import RequestManager from 'js-request-manager/src/RequestManager';
import RequestClass   from "js-request-manager/src/Class/RequestClass";

import axios from 'axios';

const schema = {
  Auth: {
    authorization: ({login, password}) => {
      return new RequestClass({
        name  : 'authorization',
        type  : 'POST',
        url   : 'api://authorize', // https://domain.test/api/authorize
        params: {
          get: {},
          post: {login, password},
        },
        responsePrepare: (data) => {
          return {token: data.jwt};
        },
        errorMessage: 'Not correct login or password',
      });
    },
  }
}

const conf = {
  // not require
  hostSchema: {
    api: 'https://domain.test/api',
  },
  RequestPrepare: {
    // not require
    data (requestType, requestUrl, requestData) {
      return requestData;
    },
    // not require
    type (requestType, requestUrl, requestData) {
      return requestType;
    },
    // not require
    url (requestType, requestUrl, requestData) {
      return requestUrl.getUrl();
    },
    // not require
    axiosObject (axiosObject, options) {
      return axiosObject;
    },
  },
  ResponsePrepare: {
    // not require
    isError(riObject) {
      if( !(200 <= riObject.httpStatus && riObject.httpStatus < 300) ) {
        return true;
      }
      return false;
    },
    // not require
    getErrorInfo: async (riObject, requestClass, Config) => {
      return {
        code: 'error',
        message: riObject.data.error || 'Неизвестная ошибка',
        data: riObject.data,
      }
    },
    // not require
    getSuccessInfo: async (riObject, requestClass, Config) => {
      return riObject.data
    },
  },
  Hook: {
    // not require
    RequestPromise (requestPromise, settings) {
      console.log(requestPromise, settings);
    }
  },
  RequestClient: {
    async send(obj) { return await axios(obj); }
  }
}

const RmSimpleCreate = RequestManager(schema, conf);

export default RmSimpleCreate;
