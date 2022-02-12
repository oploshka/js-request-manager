
import RequestClass from "js-request-manager/src/Class/RequestClass";

export default {
  
  getTestJson: () => {
    return new RequestClass({
      name  : 'Test::getTestJson',
      type  : 'GET',
      url   : 'api://users',
    });
  },

}
