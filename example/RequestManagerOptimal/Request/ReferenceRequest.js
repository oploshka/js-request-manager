
import RequestClass from "js-request-manager/src/Class/RequestClass";

export default {

  getCityList: () => {
    return new RequestClass({
      name: 'getCityList',
      type: 'GET',
      url: 'api://city',
      params: {
        get: {},
        post: {},
      },
      // responsePrepare: () => {},
      // errorMessage: '',
    });
  },
};
