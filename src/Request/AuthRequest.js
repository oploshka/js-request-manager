
import RequestClass from "@requestManager/Class/RequestClass";

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
        if(data.jwt) {
          return {token: data.jwt};
        }
        return data;
      },
      // errorMessage: '',
    });
  },


};

