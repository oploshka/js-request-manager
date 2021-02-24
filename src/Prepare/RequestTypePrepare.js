// eslint-disable-next-line no-unused-vars
const RequestTypePrepare = (requestType, requestUrl, requestData) => {
  if (requestType === 'JSON-TEST') {
    requestType = 'GET';
  }
  return requestType;
};

export default RequestTypePrepare;
