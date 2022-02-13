
//
import RequestManager from "js-request-manager/src";

//
import TestRequest from "./Request/TestRequest";
import UserRequest from "./Request/UserRequest";


import iProvider from "js-request-manager/src/Contract/iProvider";

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
  hostSchema: {
    api: "https://reqres.in/api/"
  },
  // TODO: add hook?
  //
  RequestClientProvider: new iProvider(),
});
