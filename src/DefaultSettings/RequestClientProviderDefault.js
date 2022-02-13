

import RequestClientFetch     from "./RequestClient/RequestClientFetch";
import MethodDataPrepare      from "../Contract/iMethodSchemaPrepare";
import ResponsePrepareDefault from "./ResponsePrepareDefault";


export const getPreset = () => {
  // TODO: показать примеры кеша... (сомнительно)
  return {
    name              : 'default',
    RequestClient     : RequestClientFetch,
    MethodDataPrepare : new MethodDataPrepare(),
    ResponsePrepare   : ResponsePrepareDefault,
  }
};