
import iMethodSchemaPrepare from "./iMethodSchemaPrepare";
import * as RequestClientFetch from "../RequestClient/RequestClientFetch";
import iResponsePrepare from "js-request-manager/src/Contract/iResponsePrepare";

// ниже указаны типы для работы с интерфейсами.

/** @type {iMethodSchemaPrepare} */
const methodDataPrepare = new iMethodSchemaPrepare();

/** @type {iRequestClient} */
const requestClient = Object.assign(RequestClientFetch, {});

/** @type {iResponsePrepare} */
const responsePrepare = new iResponsePrepare();

//

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
      MethodDataPrepare : methodDataPrepare,
      RequestClient     : requestClient,
      ResponsePrepare   : responsePrepare,
    }
  };
};

export default iProvider;