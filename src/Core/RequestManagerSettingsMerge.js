
// presetManagerMerge
const mergePresetManager = (obj) => {
  if(!obj) {
    return {
      presets: {
        default: {
          methodInfoPrepare:  mergeMethodInfoPrepare({}),
          responsePrepare:    mergeResponsePrepare({}),
          requestClient:      mergeRequestClient(null)
        },
      },
      getPreset: () => { return 'default'; }
    };
  }
  
  if(!obj.presets    ) { throw new Error('PresetManager require field "presets" '); }
  if(!obj.getPreset  ) { throw new Error('PresetManager require field "getPreset"   '); }
  
  return {
    presets:    mergePreset(obj.presets),
    getPreset:  obj.getPreset,
  };
};

const mergePreset = (presets) => {
  const mergePresets = {};
  if(presets) {
    for (const key in presets) {
      const preset = presets[key];
      mergePresets[key] = {
        methodInfoPrepare:  mergeMethodInfoPrepare(preset.methodInfoPrepare),
        responsePrepare:    mergeResponsePrepare(preset.responsePrepare),
        // Требует полной реализации или использования по умолчанию
        requestClient:      mergeRequestClient(preset.requestClient)
      };
    }
  }
  
  return mergePresets;
};

import {
  RequestPrepareDataDefault,
  RequestPrepareTypeDefault,
  RequestPrepareUrlDefault
} from '../Preset/MethodInfoPrepare/MethodInfoPrepareDefault';

const mergeMethodInfoPrepare = (obj) => {
  return {
    prepareData: (obj && obj.prepareData) ? obj.prepareData : RequestPrepareDataDefault,
    prepareType: (obj && obj.prepareType) ? obj.prepareType : RequestPrepareTypeDefault,
    prepareUrl:  (obj && obj.prepareUrl)  ? obj.prepareUrl  : RequestPrepareUrlDefault,
  };
};


import {
  getErrorNetworkMessage,
  isSuccess,
  getSuccessInfo,
  errorHandlerList
} from '../Preset/ResponsePrepare/ResponsePrepareDefault';

const mergeResponsePrepare = (obj) => {
  return {
    getErrorNetworkMessage: (obj && obj.getErrorNetworkMessage) ? obj.getErrorNetworkMessage  : getErrorNetworkMessage,
    isSuccess:              (obj && obj.isSuccess)              ? obj.isSuccess               : isSuccess,
    getSuccessInfo:         (obj && obj.getSuccessInfo)         ? obj.getSuccessInfo          : getSuccessInfo,
    errorHandlerList:       (obj && obj.errorHandlerList)       ? obj.errorHandlerList        : errorHandlerList,
    // TODO: delete getErrorHandlerList()
  };
};


import * as RequestClientAxios from '../Preset/RequestClient/Axios/RequestClientAxios';

const mergeRequestClient = (obj) => {
  if(!obj) {
    return RequestClientAxios;
  }
  
  if(!obj.requestToClientObject ) { throw new Error('RequestClient require field "requestToClientObject" '); }
  if(!obj.prepareClientObject   ) { throw new Error('RequestClient require field "prepareClientObject"   '); }
  if(!obj.send                  ) { throw new Error('RequestClient require field "send"                  '); }
  if(!obj.isNetworkError        ) { throw new Error('RequestClient require field "isNetworkError"        '); }
  if(!obj.clientResponseToObject) { throw new Error('RequestClient require field "clientResponseToObject"'); }
  
  return obj;
};


import RmCache from '../Preset/RmCache/RmCacheDefault';
import HostAliasDefault from '../Preset/HostAlias/HostAliasDefault';
import HookDefault from '../Preset/Hook/HookDefault';
//
export default (rmSettings) => {
  
  return {
    cache:      rmSettings.rmCache    || new RmCache(),
    hostAlias:  rmSettings.hostAlias  || HostAliasDefault,
    hook:       rmSettings.hook       || HookDefault,
  
    /*
    {
      presets: {
        //
        default: {
          
          methodInfoPrepare: mergeMethodInfoPrepare(),
  
          responsePrepare: mergeResponsePrepare(),
          
          // Требует полной реализации или использования по умолчанию
          requestClient: mergeRequestClient()
          
        },
        //
        keycloak: {},
        mira: {},
      },
      // setPresetByName,
      // getPresetByName,
      getPreset: rmS1ettings.presetManager.getPreset
    },
    */
    presetManager: mergePresetManager(rmSettings.presetManager)
  };
};
