
/**
 * Конвертируем объект RequestSchemaMergeClass в объект для отправки
 * Тут пишем только конвертацию!!!
 *
 * @param {RequestClass} requestClass
 * @returns {Object} Произвольные данные в приемлемом формате для отправки
 */
export const requestToClientObject = (requestClass) => {
  const clientObject = {}
  return clientObject;
};

/**
 * Дополняем объект clientObject дополнительной информацией (установка токенов и тп.)
 *
 * @param clientObject объект который вернули в requestToClientObject
 * @param {RequestClass} requestClass __ Параметр под вопросом
 * @returns {Object} Произвольные данные в приемлемом формате для отправки
 */
export const prepareClientObject = async(clientObject, requestClass) => {
  return clientObject;
};

/**
 *
 * @param clientObject
 * @returns {Promise<>}
 */
export const send = async(clientObject) => {
  const client = (sendObject) => { /* ... */ }; // используем клиент для отправки (fetch, axios, xhr или др...)
  return client(clientObject); // необходимо вернуть промис
};

// TODO: метод под вопросом
export const isNetworkError = (clientResponse, requestClass, Config) => {
  // if(!axiosResponse.status /* axiosResponse.isAxiosError &&  !axiosResponse.response */ ) {
  if( !(axiosResponse.request && axiosResponse.request.status) ) {
    return axiosResponse.message ? axiosResponse.message : 'Неизвестная сетевая ошибка';
  }
};

/**
 * Преобразуем ответ в единую структуру
 * @param clientResponse
 * @param RequestSchemaMergeClass __ Параметр под вопросом
 * @returns {Promise<{headers: {}, data: {}, httpStatus: number, contentType: string}>}
 */
export const clientResponseToObject = async (clientResponse, RequestSchemaMergeClass) => {
  const ri = {
    httpStatus  : -1,
    contentType : '',
    data        : {},
    headers     : {}
  }
  return ri;
};

/**
 * RequestClient - формально это интерфейс
 * @constructor
 */
const iRequestClient = function () {
  
  this.requestToClientObject          = requestToClientObject;
  this.prepareClientObject            = prepareClientObject;
  this.send                           = send;
  this.isNetworkError                 = isNetworkError;
  this.clientResponseToObject  = clientResponseToObject;
};

export default iRequestClient;

