/* eslint-disable no-unused-vars */

export const RequestPrepareData = (requestType, requestUrl, requestData) => {
  return requestData;
};

export const RequestPrepareType = (requestType, requestUrl, requestData) => {
  return requestType;
};

export const RequestPrepareUrl  = (requestType, requestUrl, requestData) => {
  return requestUrl.getUrl();
};

/**
 * iMethodInfoPrepare - формально это интерфейс
 * Предназначение - иметь возможность отследить и изменить метод, адрес и данные для отправки
 *
 * @constructor
 */
const iMethodInfoPrepare = function () {
  this.prepareData  = RequestPrepareData;
  this.prepareType  = RequestPrepareType;
  this.prepareUrl   = RequestPrepareUrl;
};

// TODO: подумать о необходимости метода...
export default iMethodInfoPrepare;