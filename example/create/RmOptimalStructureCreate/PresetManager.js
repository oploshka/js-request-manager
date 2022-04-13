

import * as ApiRequestClientAxios  from './Preset/Api/ApiRequestClientAxios';
import * as KeycloakRequestClientAxios  from './Preset/Keycloak/KeycloakRequestClientAxios';
import * as TestServerRequestClientAxios  from './Preset/TestServer/TestServerRequestClientAxios';

import ApiMethodInfoPrepare   from './Preset/Api/ApiMethodInfoPrepare';
import ApiResponsePrepare     from './Preset/Api/ApiResponsePrepare';
const ApiMethodInfoPrepareObj = new ApiMethodInfoPrepare();
const ApiResponsePrepareObj   = new ApiResponsePrepare();

/**
 * PresetManager
 * @constructor
 */
const PresetManager = function () {
  
  /**
   * @returns {{name: string, RequestClient: iRequestClient, MethodDataPrepare: methodInfoPrepareDefault, ResponsePrepare: apiResponsePrepare}}
   */
  this.getPreset = (methodInfo) => {
  
    const providerName = methodInfo.getProviderName();
  
    if(providerName === 'TEST_SERVER') {
      // TODO: fix
      return {
        name              : 'TEST_SERVER',
        methodInfoPrepare : ApiMethodInfoPrepareObj,
        requestClient     : TestServerRequestClientAxios,
        responsePrepare   : ApiResponsePrepareObj,
      }
    }
    
    if(providerName === 'KEYCLOAK') {
      // TODO: fix
      return {
        name              : 'KEYCLOAK',
        methodInfoPrepare : ApiMethodInfoPrepareObj,
        requestClient     : KeycloakRequestClientAxios,
        responsePrepare   : ApiResponsePrepareObj,
      }
    }
    
    
    return {
      name              : 'default',
      methodInfoPrepare : ApiMethodInfoPrepareObj,
      requestClient     : ApiRequestClientAxios,
      responsePrepare   : ApiResponsePrepareObj,
    }
  };
};

export default PresetManager;