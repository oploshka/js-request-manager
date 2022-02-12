
//
import RequestManager from "js-request-manager/src/RequestManager";

//
import TestRequest from "./Request/TestRequest";
import UserRequest from "./Request/UserRequest";

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
  RequestClientProvider: {
    name: 'FETCH',
    // async send(obj) { return await axios(obj); }
  }
});
