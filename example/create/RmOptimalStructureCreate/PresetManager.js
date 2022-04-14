

import * as ApiRequestClientAxios  from './Preset/Api/ApiRequestClientAxios';

import ApiMethodInfoPrepare   from './Preset/Api/ApiMethodInfoPrepare';
import ApiResponsePrepare     from './Preset/Api/ApiResponsePrepare';
const ApiMethodInfoPrepareObj = new ApiMethodInfoPrepare();
const ApiResponsePrepareObj   = new ApiResponsePrepare();


const PresetManager = function () {
  
  this.getPreset = (methodInfo) => {
    return {
      name              : 'default',
      methodInfoPrepare : ApiMethodInfoPrepareObj,
      requestClient     : ApiRequestClientAxios,
      responsePrepare   : ApiResponsePrepareObj,
    }
  };
};

export default PresetManager;