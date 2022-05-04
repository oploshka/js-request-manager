
//
//
// TODO: emitter && listener https://www.npmjs.com/package/event-emitter
//
//

const getUniqueKey = (() => {
  // let prefix = 'RM_'+ Math.random().toString(36).substring(7)  + '_';
  let id = 1;
  
  return () => {
    // let uniqueId = prefix + id;
    let uniqueId = 'RmListener_'+ id + '_' + Math.random().toString(36).substring(7);
    id++;
    return uniqueId;
  };
})()

/**
 * @constructor
 */
const RmListenerDefault = function () {
  const listener = {};
  const _cache = {};
  
  const addEventListener = (eventName, callback) => {
    if (typeof (eventName) !== 'string' || typeof (callback) !== 'function') {
      // TODO: add exception
      return null;
    }
    if(!listener[eventName]){
      listener[eventName] = [];
    }
    
    const eventId = getUniqueKey();
    // TODO:
    listener[eventName].push({
      // eventId: eventId,
      callback: callback,
    });
    _cache[eventId] = {
      name: eventName,
    };
    
    return eventId;
  };
  
  // TODO: add support todo
  /*
  const removeEventListener = (id) => {
    if (typeof (id) !== 'string') {
      // TODO: add exception
      return null;
    }
    
    if(!_cache[id]){
      return false;
    }
    
    return false
  }
  */
  
  const emitEvent = (eventName, data) => {
    if (typeof (eventName) !== 'string' ) {
      // TODO: add exception
      return null;
    }
    
    if(!listener[eventName]) {
      return;
    }
    
    for(let i = 0; i < listener[eventName].length; i++){
      listener[eventName][i].callback(data);
    }
  };
  
  
  this.on = addEventListener;
  this.emit = emitEvent;
};

export default RmListenerDefault;
