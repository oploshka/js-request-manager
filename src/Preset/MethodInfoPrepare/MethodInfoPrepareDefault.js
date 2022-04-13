
export const RequestPrepareData = (requestType, requestUrl, requestData) => {
  return requestData;
};

export const RequestPrepareType = (requestType, requestUrl, requestData) => {
  return requestType;
};

export const RequestPrepareUrl  = (requestType, requestUrl, requestData) => {
  return requestUrl.getUrl();
};

const methodInfoPrepareDefault = function () {
  this.prepareData  = RequestPrepareData;
  this.prepareType  = RequestPrepareType;
  this.prepareUrl   = RequestPrepareUrl;
};

export default methodInfoPrepareDefault;