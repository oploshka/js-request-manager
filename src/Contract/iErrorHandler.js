
/**
 * Это интерфейс функции
 * @param {ResponseClass} responseClass
 * @param {RequestClass} requestClass
 * @returns {Promise<{code: string, message: string, data: {Object}}>}
 */
const iErrorHandler = async (responseClass, requestClass) => {
  return {
    code:     'ERROR_DEFAULT',
    message:  'Undefined error',
    data:     {},
  };
};
