

/** @type {iRequestClient} */
const requestClient = null;

/** @type {iMethodSchemaPrepare} */
const methodDataPrepare = null;

/** @type {iResponsePrepare} */
const responsePrepare = null;

/**
 * iProvider - формально это интерфейс
 * @constructor
 */
const iProvider = function () {
  /**
   * @returns {{name: string, RequestClient: iRequestClient, MethodDataPrepare: iMethodSchemaPrepare, ResponsePrepare: iResponsePrepare}}
   */
  this.getPreset = () => {
    return {
      name              : 'default',
      RequestClient     : requestClient,
      MethodDataPrepare : methodDataPrepare,
      ResponsePrepare   : responsePrepare,
    }
  };
};

export default iProvider;