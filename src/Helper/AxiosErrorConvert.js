
import RequestManagerException from '../Class/RequestManagerException';

import {HTTP_ERROR_STATUS, getStatusInfo} from "../Helper/HttpStatus";
import {isArray} from "../Helper/Helper";

const AxiosErrorConvert = async (error) => {
  let returnError = error;

  if (error.isAxiosError ) {

    // network error
    if(!error.response) {
      return new RequestManagerException(
        'ERROR_NETWORK',
        error.message ? error.message : 'Неизвестная сетевая ошибка',
        {axiosErrorObject: error}
      );
    }



    if(error.response.data && error.response.headers['content-type'] === 'application/json') {
      let responseData = error.response.data;
      if (responseData instanceof Blob) {
        responseData = await error.response.data.text().then(text => JSON.parse(text));
      }

      // Фикс отдачи сообщения об ошибке
      let errorMessage = '';
      try {
        for(let key in responseData) {
          if(errorMessage !== '' ) {
            errorMessage += "\n";
          }
          if( isArray(responseData[key]) ){
            errorMessage += responseData[key].join("\n");
          } else {
            // isString
            errorMessage += responseData[key];
          }
        }
        if(errorMessage){
          return new RequestManagerException('ERROR_BACKEND', errorMessage, {axiosErrorObject: error});
        }
      } catch (e) {
        errorMessage = '';
        console.error(e);
      }

    }

    // http error
    let httpStatus = error.response.status;
    let errorCode    = 'ERROR_HTTP_STATUS_' + httpStatus;
    let errorMessage  = getStatusInfo(httpStatus);
    errorMessage      += errorMessage ? ': ' : '';
    errorMessage      += httpStatus + ' ';
    errorMessage      += (httpStatus in HTTP_ERROR_STATUS) ?  HTTP_ERROR_STATUS[httpStatus] : 'Undefined error';

    return new RequestManagerException(errorCode, errorMessage, {axiosErrorObject: error});
  }


  if (!(returnError instanceof RequestManagerException)) {
    returnError = new RequestManagerException('ERROR_UNDEFINED', '', returnError);
  }

  return returnError;
};

export default AxiosErrorConvert;
