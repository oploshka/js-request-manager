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