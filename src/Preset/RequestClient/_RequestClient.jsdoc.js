
/**
 *
 * Набор методов для изменения вариантов отправки запроса
 * - requestToClientObject  - Преобразование данных в клиент запроса
 * - prepareClientObject    - Установка дополнительных данных
 * - send                   - Отправка данных
 * - isNetworkError         - Является ли ошибка сетевой
 * - clientResponseToObject - Преобразовать ответ клиента во внутренний формат
 *
 * @typedef {Object} iRmRequestClientObject
 * @property {iRmRequestClient_requestToClientObject} requestToClientObject
 * @property {iRmRequestClient_prepareClientObject} prepareClientObject
 * @property {iRmRequestClient_send} send
 * @property {iRmRequestClient_isNetworkError} isNetworkError
 * @property {iRmRequestClient_clientResponseToObject} clientResponseToObject
 *
 * @example ```js
 * const requestClient = {
 *   requestToClientObject: null,
 *   prepareClientObject: null,
 *   send: null,
 *   isNetworkError: null,
 *   clientResponseToObject: null,
 * };
 * ```
 */

/**
 *
 * Преобразование данных в клиент запроса
 * Конвертируем объект RequestSchemaMergeClass в объект для отправки
 * Тут пишем только конвертацию!!!
 *
 * @callback iRmRequestClient_requestToClientObject
 * @param {RequestClass} requestClass
 * @returns {iRmClientObject}
 */

/**
 *
 * Произвольные данные в приемлемом формате для отправки
 *
 * @typedef {Object} iRmClientObject
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
 * Отправка данных
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
 * Является ли ошибка сетевой
 *
 * @callback iRmRequestClient_isNetworkError
 * @param {iRmClientObject} clientResponse
 * @param {Object} requestClass
 * @param {Object} Config
 * @returns {Promise}
 *
 * @example ```js
 * export const isNetworkError = (clientResponse, requestClass, Config) => {
 *   // ...
 *   return {};
 * };
 * ```
 *
 */


/**
 *
 * @callback iRmRequestClient_clientResponseToObject - Преобразуем ответ в единую структуру
 * @param clientResponse
 * @param RequestSchemaMergeClass __ Параметр под вопросом
 * @returns {Promise<{headers: {}, data: {}, httpStatus: number, contentType: string}>}
 *
 * @example <caption>Say `Hello!` to the user.</caption>
 *
 * ```js
 * export const clientResponseToObject = async (clientResponse, RequestSchemaMergeClass) => {
 *   const ri = {
 *     httpStatus  : -1,
 *     contentType : '',
 *     data        : {},
 *     headers     : {}
 *   }
 *   return ri;
 * };
 * ```
 *
 */
