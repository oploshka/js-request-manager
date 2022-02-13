
//
import RequestManager from "js-request-manager/src";

//
import TestRequest from "./Request/TestRequest";
import UserRequest from "./Request/UserRequest";

import * as RequestClientFetch from "js-request-manager/src/DefaultSettings/RequestClient/RequestClientFetch";
import MethodDataPrepare      from "js-request-manager/src/Contract/iMethodSchemaPrepare";
import * as ResponsePrepareDefault from "js-request-manager/src/DefaultSettings/ResponsePrepareDefault";
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
    getPreset() {
      // TODO: показать примеры кеша... (сомнительно)
      return {
        name              : 'default',
        MethodDataPrepare : new MethodDataPrepare(),
        RequestClient     : Object.assign(RequestClientFetch, {}),
        ResponsePrepare   : ResponsePrepareDefault,
      }
    }
  },
});
