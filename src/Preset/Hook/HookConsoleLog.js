/**
 * @returns {iRmHookObject}
 */
export default {
  RequestPromise(requestPromise, settings) {
    requestPromise.then(
      (result) => {
        console.log('[REQUEST_MANAGER_HOOK] Request success', result);
      },
      (error) => {
        console.log('[REQUEST_MANAGER_HOOK] Request error', error);
      });
  }
};
