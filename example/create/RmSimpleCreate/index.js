import RequestManager from 'js-request-manager/src/RequestManager';
import RequestClass   from "js-request-manager/src/Class/RequestClass";

const RmSimpleCreate = RequestManager({
  RequestSchema: {
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
  },
  Config: {
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
      validate (responseData) {
        return responseData;
      },
    },
    Hook: {
      // not require
      RequestPromise (requestPromise, settings) {
        console.log(requestPromise, settings);
      }
    },
  }
});

export default RmSimpleCreate;
