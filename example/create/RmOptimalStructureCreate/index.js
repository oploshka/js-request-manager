import RequestManager from 'js-request-manager/src/RequestManager';


// Config
import hostAlias             from "./Config/HostSchema";
import RequestClientProvider  from "./Preset/RequestClientProvider";
import Hook                   from "./Config/Hook";

// RequestSchema
import RequestSchema from "./RequestSchema";

const RmOptimalStructureCreate = RequestManager(RequestSchema, {
  hostAlias            : hostAlias,
  RequestClientProvider : RequestClientProvider,
  Hook                  : Hook,
});

export default RmOptimalStructureCreate;
