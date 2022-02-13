
import MethodSchema from "js-request-manager/src/Class/MethodSchema";

export default {
  
  getTestJson: () => {
    return new MethodSchema({
      name  : 'Test::getTestJson',
      type  : 'GET',
      url   : 'api://users',
    });
  },

}
