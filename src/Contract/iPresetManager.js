
import iMethodInfoPrepare from "./iMethodInfoPrepare";
import * as RequestClientFetch from "../RequestClient/RequestClientFetch";
import iResponsePrepare from "./iResponsePrepare";

// ниже указаны типы для работы с интерфейсами.

/** @type {iMethodInfoPrepare} */
const methodInfoPrepare = new iMethodInfoPrepare();

/** @type {iRequestClient} */
const requestClient = Object.assign(RequestClientFetch, {});

/** @type {iResponsePrepare} */
const responsePrepare = new iResponsePrepare();

//

/**
 * iPresetManager - формально это интерфейс
 * @constructor
 */
const iPresetManager = function () {
  /**
   * @returns {{name: string, requestClient: iRequestClient, methodInfoPrepare: iMethodInfoPrepare, responsePrepare: iResponsePrepare}}
   */
  this.getPreset = () => {
    return {
      name              : 'default',
      methodInfoPrepare : methodInfoPrepare,
      requestClient     : requestClient,
      responsePrepare   : responsePrepare,
    }
  };
};

export default iPresetManager;