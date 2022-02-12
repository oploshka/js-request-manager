

/** @type {iRequestClient} */
const requestClient = null;

/** @type {iResponsePrepare} */
const requestPrepare = null;

/** @type {iResponsePrepare} */
const responsePrepare = null;

/**
 * iProvider - формально это интерфейс
 * @constructor
 */
const iProvider = function () {
  
  /**
   *
   * @returns {{RequestPrepare: iResponsePrepare, name: string, RequestClient: iRequestClient, ResponsePrepare: iResponsePrepare}}
   */
  this.getPreset = () => {
    return {
      name            : 'default',
      RequestClient   : requestClient,
      RequestPrepare  : requestPrepare,
      ResponsePrepare : responsePrepare,
    }
  };
};

export default iRequestClient;