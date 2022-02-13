
import RequestManager from "js-request-manager/src";
import iProvider from "js-request-manager/src/Contract/iProvider";

import NumberAPIRequestSchema from "./Request/AllRequest"


/**
 * @alias NumberAPIRequestSchemaObject need fix return value {RequestClass} in {Promise}
 */
export default RequestManager(NumberAPIRequestSchema,{
  RequestClientProvider: new iProvider(),
});
