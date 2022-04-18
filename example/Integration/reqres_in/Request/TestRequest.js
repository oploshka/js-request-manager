
import MethodInfo from "js-request-manager/src/Class/MethodInfo";

export default {
  
  getTestJson: () => {
    return new MethodInfo({
      name  : 'Test::getTestJson',
      type  : 'GET',
      url   : 'api://users',
    });
  },

}
