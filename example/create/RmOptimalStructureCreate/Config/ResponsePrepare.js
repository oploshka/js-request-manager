
// ResponsePrepare
export default {
  isError(riObject) {
    if( !(200 <= riObject.httpStatus && riObject.httpStatus < 300) ) {
      return true;
    }
    return false;
  },

  getErrorInfo: async (riObject, requestClass, Config) => {
    return {
      code: 'error',
      message: riObject.data.error || 'Неизвестная ошибка',
      data: riObject.data,
    }
  },

  getSuccessInfo: async (riObject, requestClass, Config) => {
    return riObject.data
  },
};


