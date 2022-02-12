
export const getErrorNetworkMessage = () => {

}

// Ответ успешный
export const isSuccess = (riObject) => {
  if( !(200 <= riObject.httpStatus && riObject.httpStatus < 300) ) {
    return false;
  }
  return true;
}

// TODO: упростить в 1 метод? (isSuccess + getSuccessInfo)
export const getSuccessInfo = async (riObject, requestClass, Config) => {
  let data = riObject.data;
  
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



