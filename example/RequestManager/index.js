import RequestManager from '@requestManager/RequestManager';

// Config
import hostSchema      from "./Config/HostSchema";
import RequestPrepare  from "./Config/RequestPrepare";
import ResponsePrepare from "./Config/ResponsePrepare";
import Hook            from "./Config/Hook";

// RequestSchema
import RequestSchema from "./RequestSchema";

global.RequestManager = RequestManager({
  RequestSchema: RequestSchema,
  Config: {
    hostSchema      : hostSchema,
    RequestPrepare  : RequestPrepare,
    ResponsePrepare : ResponsePrepare,
    Hook            : Hook,
  }
});
