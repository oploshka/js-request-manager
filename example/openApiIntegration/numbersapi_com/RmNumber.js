
import RequestManager from "js-request-manager/src";
import iPresetManager from "js-request-manager/src/Contract/iPresetManager";

import NumberAPIRequestSchema from "./Request/AllRequest"


/**
 * @alias NumberAPIRequestSchemaObject need fix return value {RequestClass} in {Promise}
 */
export default RequestManager(NumberAPIRequestSchema,{
  presetManager: new iPresetManager(),
});
