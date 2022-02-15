import {isFunction, isString} from "../Helper/Helper";

/**
 * @constructor
 */
const RmCache = function () {
  let store = {};
  
  /**
   * @param {RequestClass} RequestClass
   * @param {Object} data
   * @returns {undefined|*}
   */
  const getCache = (RequestClass, data) => {
    const cacheInfo = RequestClass.getMethodInfo().getCache(); // TODO: add RmCacheClass
    if(!cacheInfo) {
      return undefined;
    }
    //
    const cacheGroupName = RequestClass.getName()
    if(!store[cacheGroupName]) {
      return undefined;
    }

    let obj = cacheInfo.getKey();
    let cacheName = '';
    if( isFunction(obj) ) {
      cacheName = obj(data);
    } else if( isString(obj) ) {
      cacheName = obj;
    } else {
      console.warn('[RmCache] not supported key', obj);
      return undefined;
    }

    return store[cacheGroupName][cacheName];
  };
  
  /**
   * @param {RequestClass} RequestClass
   * @param {Object} data
   * @param {Object} setData
   * @returns {void}
   */
  const setCache = (RequestClass, data, setData) => {

    const cacheInfo = RequestClass.getMethodInfo().getCache(); // TODO: add RmCacheClass
    if(!cacheInfo) {
      return; // не устанавливаем кеш!!! (опасный момент)
    }
    //
    const cacheGroupName = RequestClass.getName()
    if(!store[cacheGroupName]) {
      store[cacheGroupName] = {};
    }

    let obj = cacheInfo.getKey();
    let cacheName = '';
    if( isFunction(obj) ) {
      cacheName = obj(data);
    } else if( isString(obj) ) {
      cacheName = obj;
    } else {
      console.warn('[RmCache] not supported key', obj);
      return;
    }

    store[cacheGroupName][cacheName] = setData;
  };
  
  this.getCache = getCache;
  this.setCache = setCache;
  
}

// let r = new RmCache();
// r.getCache()

export default RmCache;
