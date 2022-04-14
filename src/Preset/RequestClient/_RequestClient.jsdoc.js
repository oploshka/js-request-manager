
/**
 * @typedef iRmRequestClientObject
 *
 * Набор методов для изменения вариантов отправки запроса
 *
 * @property {iRmRequestClient_requestToClientObject}   requestToClientObject  -
 * @property {iRmRequestClient_prepareClientObject}     prepareClientObject    -
 * @property {iRmRequestClient_send}                    send                   -
 * @property {iRmRequestClient_isNetworkError}          isNetworkError         -
 * @property {iRmRequestClient_clientResponseToObject}  clientResponseToObject -
 *
 */

/**
 * @callback iRmRequestClient_requestToClientObject
 *
 * Конвертируем объект RequestSchemaMergeClass в объект для отправки
 * Тут пишем только конвертацию!!!
 *
 * @param {RequestClass} requestClass
 * @returns {iRmClientObject}
 */

/**
 * @typedef iRmClientObject - Произвольные данные в приемлемом формате для отправки
 */

/**
 * Дополняем объект clientObject дополнительной информацией (установка токенов и тп.)
 *
 * @callback iRmRequestClient_prepareClientObject
 * @param {iRmClientObject} clientObject объект который вернули в requestToClientObject
 * @param {RequestClass}    requestClass __ Параметр под вопросом
 * @returns {iRmClientObject}
 */

/**
 *
 * @callback iRmRequestClient_send RequestClient.send()
 * @param {iRmClientObject}
 * @returns {Promise}
 *
 * @example
 * export const send = async(clientObject) => {
 *   const client = (sendObject) => {}; // используем клиент для отправки (fetch, axios, xhr или др...)
 *   return client(clientObject);       // необходимо вернуть промис
 * };
 *
 */


/**
 *
 * @callback iRmRequestClient_isNetworkError RequestClient.isNetworkError() -  метод под вопросом
 * @param {iRmClientObject}
 * @returns {Promise}
 *
 * @example
 * export const isNetworkError = (clientResponse, requestClass, Config) => {
 *   // ...
 *   return {};
 * };
 *
 */

/**
 *
 * @callback iRmRequestClient_clientResponseToObject
 *
 * Преобразуем ответ в единую структуру
 *
 * @param clientResponse
 * @param RequestSchemaMergeClass __ Параметр под вопросом
 * @returns {Promise<{headers: {}, data: {}, httpStatus: number, contentType: string}>}
 *
 * @example
 *
 * export const clientResponseToObject = async (clientResponse, RequestSchemaMergeClass) => {
 *   const ri = {
 *     httpStatus  : -1,
 *     contentType : '',
 *     data        : {},
 *     headers     : {}
 *   }
 *   return ri;
 * };
 *
 */
