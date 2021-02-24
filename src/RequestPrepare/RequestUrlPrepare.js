const hostSchema = {
  http : 'http://',
  https: 'https://',
  auth : process.env.VUE_APP_BACKEND_AUTH_API_URL + '/',
  api  : process.env.VUE_APP_BACKEND_API_URL + '/',
  //
  'json-test': '/request/'
};

// eslint-disable-next-line no-unused-vars
const RequestUrlPrepare = (requestType, requestUrl, requestData) => {

  const requestUrlArray = requestUrl.split('://');

  if(requestUrlArray.length > 2) {
    // eslint-disable-next-line no-console
    console.warn('[REQUEST MANAGER] prepareUrl not correct requestUrl', requestUrl);
  }
  else if(requestUrlArray.length === 2) {
    const host = requestUrlArray[0].toLowerCase();
    if(host in hostSchema) {
      requestUrl = hostSchema[ host ] + requestUrlArray[1];
    } else {
      // eslint-disable-next-line no-console
      console.warn('[REQUEST MANAGER] prepareUrl not correct hostSchema', requestUrl);
    }
  }

  return requestUrl;
};

export default RequestUrlPrepare;
