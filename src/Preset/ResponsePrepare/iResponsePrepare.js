
export const getErrorNetworkMessage = () => {

}

/**
 * Ответ успешный ?
 * @param {ResponseClass} responseClass
 * @param {RequestClass} requestClass
 * @returns {boolean}
 */
export const isSuccess = (responseClass, requestClass) => {
  const httpStatus = responseClass.getHttpStatus()
  if( !(200 <= httpStatus && httpStatus < 300) ) {
    return false;
  }
  return true;
}

// TODO: упростить в 1 метод? (isSuccess + getSuccessInfo)
/**
 * Ответ успешный ?
 * @param {ResponseClass} responseClass
 * @param {RequestClass} requestClass
 * @returns {} Можно вернуть что угодно
 */
export const getSuccessInfo = async (responseClass, requestClass) => {
  let data = responseClass.getDataObj();
  
  //
  if(data instanceof Blob) {
    // data = await RequestClient.fileDownload(data, ri, requestClass, Config);
    return {};
  }
  return data;
}


/**
 * @returns {[((function(ResponseClass): Promise<{code: string, message: string, data: {Object}}>)|*)]}
 */
export const getErrorHandlerList = () => {
  return [
    async (responseClass) => {
      return {
        code:     'ERROR_DEFAULT',
        message:  'Undefined error',
        data:     {},
      };
    }
  ];
}


/**
 * iResponsePrepare - формально это интерфейс
 * @constructor
 */
const iResponsePrepare = function () {
  
  this.getErrorNetworkMessage = getErrorNetworkMessage;
  this.isSuccess              = isSuccess;
  this.getSuccessInfo         = getSuccessInfo;
  this.getErrorHandlerList    = getErrorHandlerList;
};

export default iResponsePrepare;



