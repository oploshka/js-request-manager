

import RequestClientApi     from "./Api/RequestClientApi";
import RequestPrepareApi    from "./Api/RequestPrepareApi";
import ResponsePrepareApi   from "./Api/ResponsePrepareApi";


export default {
  getPreset() {
  
    return {
      name            : 'default',
      RequestClient   : RequestClientApi,
      RequestPrepare  : RequestPrepareApi,
      ResponsePrepare : ResponsePrepareApi,
    }
  }
}