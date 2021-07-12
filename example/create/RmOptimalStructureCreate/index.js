import RequestManager from 'js-request-manager/src/RequestManager';

import axios from 'axios';

// Config
import hostSchema      from "./Config/HostSchema";
import RequestPrepare  from "./Config/RequestPrepare";
import ResponsePrepare from "./Config/ResponsePrepare";
import Hook            from "./Config/Hook";

// RequestSchema
import RequestSchema from "./RequestSchema";

const RmOptimalStructureCreate = RequestManager(RequestSchema, {
  hostSchema      : hostSchema,
  RequestPrepare  : RequestPrepare,
  ResponsePrepare : ResponsePrepare,
  Hook            : Hook,
  RequestClient   : {
    async send(obj) { return await axios(obj); }
  }
});

export default RmOptimalStructureCreate;
