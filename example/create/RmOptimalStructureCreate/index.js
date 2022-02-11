import RequestManager from 'js-request-manager/src/RequestManager';


// Config
import hostSchema             from "./Config/HostSchema";
import RequestClientProvider  from "./Preset/RequestClientProvider";
import Hook                   from "./Config/Hook";

// RequestSchema
import RequestSchema from "./RequestSchema";

const RmOptimalStructureCreate = RequestManager(RequestSchema, {
  hostSchema            : hostSchema,
  RequestClientProvider : RequestClientProvider,
  Hook                  : Hook,
});

export default RmOptimalStructureCreate;
