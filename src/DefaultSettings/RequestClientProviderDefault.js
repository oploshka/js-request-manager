

import RequestClientFetch     from "./RequestClient/RequestClientFetch";
import RequestPrepareDefault  from "./RequestPrepareDefault";
import ResponsePrepareDefault from "./ResponsePrepareDefault";


export const getPreset = () => {
  // TODO: показать примеры кеша... (сомнительно)
  return {
    name            : 'default',
    RequestClient   : RequestClientFetch,
    RequestPrepare  : RequestPrepareDefault,
    ResponsePrepare : ResponsePrepareDefault,
  }
};
