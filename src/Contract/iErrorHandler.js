
/**
 * Это интерфейс функции
 * @param {ResponseClass} responseClass
 * @returns {Promise<{code: string, message: string, data: {Object}}>}
 */
const iErrorHandler = async (responseClass) => {
  return {
    code:     'ERROR_DEFAULT',
    message:  'Undefined error',
    data:     {},
  };
}