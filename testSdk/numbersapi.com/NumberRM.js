import RequestClass from "../../src/Class/RequestClass";
import RequestManager from "../../src/RequestManager";

const NumberRequestSchema =  {
  testHtml: () => {
    return new RequestClass({
      name  : 'testSend',
      type  : 'GET',
      url   : 'http://numbersapi.com/2/29/date',
    });
  },
  testJson: () => {
    return new RequestClass({
      name  : 'testSend',
      type  : 'GET',
      url   : 'http://numbersapi.com/random/year?json',
    });
  },

};

const NumberRM = RequestManager({RequestSchema: NumberRequestSchema});

export default NumberRM;
