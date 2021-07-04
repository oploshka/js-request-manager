
import RequestClass from "js-request-manager/src/Class/RequestClass";

export default {

  authorization: ({login, password}) => {
    return new RequestClass({
      name  : 'authorization',
      type  : 'POST',
      url   : 'auth://authorize',
      params: {
        get: {},
        post: {login, password},
      },
      responsePrepare: (data) => {
        return {token: data.jwt};
      },
      // errorMessage: '',
    });
  },


};

