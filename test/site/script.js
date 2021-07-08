
import RequestManager from "../../src/RequestManager";
import RequestClass   from "../../src/Class/RequestClass";

const RequestSchema =  {

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




const rm = RequestManager({RequestSchema: RequestSchema});
// rm.testHtml().then(console.log, console.warn);
rm.testJson().then(console.log, console.warn);

export default rm
