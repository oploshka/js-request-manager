
// Это обертка над промисом с возможностью сделать отмену вопроса
export default ( userFunc ) => {
  
  let promiseObj = null;
  //
  let promise = new Promise(function (resolve, reject) {
    promiseObj = {
      resolve: resolve,
      reject: reject,
      abortStatus: false, // TODO: общий статус SEND | SUCCESS | ERROR | ABORT
      abort: () => {}, // необходимо переопределить
    }
  });
  
  promise.abort = () => {
    if(!promiseObj.abortStatus) { // TODO : add success | error
      promiseObj.abortStatus = true;
      promiseObj.abort();
    }
  };
  
  //
  userFunc( promiseObj );
  
  return promise;
};
