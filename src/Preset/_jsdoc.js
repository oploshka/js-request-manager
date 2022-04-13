
/**
 * @typedef iRmErrorObject
 * @property  {String} code
 * @property  {String} message
 * @property  {Object} data
 */

/**
 *
 * @callback iRmErrorHandler
 * @param {ResponseClass} responseClass
 * @param {RequestClass}  requestClass
 * @returns {Promise<iRmErrorObject>}
 */




/**
 * @callback iRmRequestPrepareData
 * @param {String} requestType
 * @param {String} requestUrl
 * @param {String} requestData
 * @returns {Promise}
 */

/**
 * @callback iRmRequestPrepareType
 * @param {String} requestType
 * @param {String} requestUrl
 * @param {String} requestData
 * @returns {Promise<String>}
 */

/**
 * @callback RequestPrepareUrl
 * @param {String} requestType
 * @param {String} requestUrl
 * @param {String} requestData
 * @returns {Promise<String>}
 */

/**
 * @typedef iRmMethodInfoPrepareObject
 *
 * @property  {iRmRequestPrepareData} prepareData
 * @property  {iRmRequestPrepareType} prepareType
 * @property  {RequestPrepareUrl} prepareUrl
 *
 */

/**
 * TODO: подумать о необходимости метода...
 * iMethodInfoPrepare - формально это интерфейс
 * Предназначение - иметь возможность отследить и изменить метод, адрес и данные для отправки
 *
 * @callback iRmMethodInfoPrepare
 * @returns {iRmMethodInfoPrepareObject}
 *
 */
