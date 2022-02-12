
//
import {isFunction, isString} from "js-request-manager/src/Helper/Helper";

export const cacheCreate = (RequestClass) => {
  // Cache get
  const cacheInfo = RequestClass.getCache()
  let cacheKey = false;
  switch (true) {
    case isString(cacheInfo):
      cacheKey = cacheInfo;
      break;
    case isFunction(cacheInfo):
      cacheKey = cacheInfo(RequestClass);
      break;
  }
  
  // TODO: use Request Name
  if(cacheKey && cache[cacheKey]) {
    let promise = new Promise(function(promiseResolve, promiseReject) {
      // WARNING - не менять данный объект
      promiseResolve(cache[cacheKey]);
    });
    promise.abort = function(){};
    //
    return { getCache: promise};
  }
  
  if(cacheKey) {
    return {
      setCache(result) {
        cache[cacheKey] = result;
      },
      rejectCache() {
        delete cache[cacheKey];
      }
    }
  }
  
  return {};
}