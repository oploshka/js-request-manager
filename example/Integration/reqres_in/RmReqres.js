
//
import RequestManager from "js-request-manager/src";

//
import TestRequest from "./Request/TestRequest";
import UserRequest from "./Request/UserRequest";


import iPresetManager from "js-request-manager/src/Contract/iPresetManager";

/**
 * @name ReqresAPIRequestSchemaObject
 */
const ReqresAPIRequestSchema =  {
  Test: TestRequest,
  User: UserRequest,
};

/**
 * @alias ReqresAPIRequestSchemaObject need fix return value {RequestClass} in {Promise}
 */
export default RequestManager(ReqresAPIRequestSchema,{
  hostAlias: {
    api: "https://reqres.in/api/"
  },
  // TODO: add hook?
  //
  presetManager: new iPresetManager(),
});
