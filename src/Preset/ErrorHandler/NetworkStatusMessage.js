
import {getStatusInfo, HTTP_ERROR_STATUS} from "../Helper/HttpStatus";

export const getStatusMessage = (status) => {
  let message = ''
  message += getStatusInfo(status);
  message += message ? ': ' : '';
  message += status + ' ';
  message += (status in HTTP_ERROR_STATUS) ?  HTTP_ERROR_STATUS[status] : 'Undefined error';
  
  return message;
};


export default async (responseClass) => {
  const httpStatus = responseClass.getHttpStatus();
  let errMessage = getStatusMessage(httpStatus);
  if(!errMessage) {
    return null;
  }
  
  return {
    code:     'NETWORK_ERROR',
    message:  errMessage,
    data:     {},
  };
}
