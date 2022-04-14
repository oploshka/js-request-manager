
export const getErrorNetworkMessage = () => {

};

export const isSuccess = (responseClass, requestClass) => {
  const httpStatus = responseClass.getHttpStatus();
  return 200 <= httpStatus && httpStatus < 300;
};

export const getSuccessInfo = async (responseClass, requestClass) => {
  let data = responseClass.getDataObj();
  
  //
  if(data instanceof Blob) {
    // data = await RequestClient.fileDownload(data, ri, requestClass, Config);
    return {};
  }
  return data;
};


// TODO: rename
export const errorHandlerList = [];
