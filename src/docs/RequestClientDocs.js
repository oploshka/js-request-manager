

/**
 * Конвертируем объект RequestSchemaMergeClass в объект для отправки
 * Тут пишем только конвертацию!!!
 *
 * @param {RequestSchemaMergeClass} RequestSchemaMergeClass
 * @returns {Object} Произвольные данные в приемлемом формате для отправки
 */
export const requestToClientObject = (RequestSchemaMergeClass) => {
  const clientObject = {}
  return clientObject;
};

/**
 * Дополняем объект clientObject дополнительной информацией (установка токенов и тп.)
 *
 * @param clientObject объект который вернули в requestToClientObject
 * @param {RequestSchemaMergeClass} RequestSchemaMergeClass __ Параметр под вопросом
 * @returns {Object} Произвольные данные в приемлемом формате для отправки
 */
export const prepareClientObject = async(clientObject, RequestSchemaMergeClass) => {
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
export const clientResponseToResponseClass = async (clientResponse, RequestSchemaMergeClass) => {
  const ri = {
    httpStatus  : -1,
    contentType : '',
    data        : {},
    headers     : {}
  }
  return ri;
};
