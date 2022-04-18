
export const RequestPrepareDataDefault = (requestType, requestUrl, requestData) => {
  return requestData;
};

export const RequestPrepareTypeDefault = (requestType, requestUrl, requestData) => {
  return requestType;
};

export const RequestPrepareUrlDefault  = (requestType, requestUrl, requestData) => {
  return requestUrl.getUrl();
};
