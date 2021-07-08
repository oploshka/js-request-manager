
import RequestManager from "../../src/RequestManager";
import RequestClass   from "../../src/Class/RequestClass";

const RequestSchema =  {

  testSend: () => {
    return new RequestClass({
      name  : 'testSend',
      type  : 'GET',
      url   : 'http://numbersapi.com/2/29/date',
      params: {
        get: {},
        post: {},
      },
      // responsePrepare: (data) => {
      //   return {token: data.jwt};
      // },
      // errorMessage: '',
    });
  },


};




const rm = RequestManager({RequestSchema: RequestSchema});
rm.testSend();

export default rm
