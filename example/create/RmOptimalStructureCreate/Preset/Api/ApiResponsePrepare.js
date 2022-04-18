import fileDownload from "js-file-download";

export const getErrorNetworkMessage = () => {};

/**
 * Ответ успешный ?
 * @param {ResponseClass} responseClass
 * @param {RequestClass} requestClass
 * @returns {boolean}
 */
export const isSuccess = (responseClass, requestClass) => {
  const httpStatus = responseClass.getHttpStatus();
  if (!(200 <= httpStatus && httpStatus < 300)) {
    return false;
  }
  return true;
};

// TODO: упростить в 1 метод? (isSuccess + getSuccessInfo)
/**
 * Ответ успешный ?
 * @param {ResponseClass} responseClass
 * @param {RequestClass} requestClass
 * @returns {} Можно вернуть что угодно
 */
export const getSuccessInfo = async (responseClass, requestClass) => {
  let data = responseClass.getDataObj();

  const settings = requestClass.getMethodInfo().getSettings();

  if (data instanceof Blob && settings?.fileDownload) {
    data = await fileDownload(data, requestClass.getMethodInfo().getFileName());
    return {};
  }
  return data;
};

/**
 * @returns {[((function(ResponseClass): Promise<{code: string, message: string, data: {Object}}>)|*)]}
 */
export const getErrorHandlerList = () => {
  return [
    async (responseClass, requestClass) => {
      return {
        code: "ERROR_STATIC",
        message: "My undefined error",
        details: {
          responseClass: responseClass,
          requestClass: requestClass,
        },
      };
    },
  ];
};

/**
 * iResponsePrepare - формально это интерфейс
 * @constructor
 */
const apiResponsePrepare = function () {
  this.getErrorNetworkMessage = getErrorNetworkMessage;
  this.isSuccess = isSuccess;
  this.getSuccessInfo = getSuccessInfo;
  this.getErrorHandlerList = getErrorHandlerList;
};

export default apiResponsePrepare;
