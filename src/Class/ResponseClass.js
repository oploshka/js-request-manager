/**
 * Единый формат ответа
 *
 * @param {Object} option
 * @param {Object} option.headers       {key: value}
 * @param {Object} option.data          любой объект
 * @param {String} option.contentType   может быть не обязательным, при сетевых ошибках
 * @param {Number} option.httpStatus    может быть не обязательным, при сетевых ошибках
 * @constructor
 */
const ResponseClass = function (option) {

  const _field = {
    headers     : option.headers || {},
    data        : option.data,
    contentType : option.contentType || '',
    httpStatus  : option.httpStatus  || null,
  };


  this.getHeaderObj   = () => { return _field.headers;      };
  this.getDataObj     = () => { return _field.data;         };
  this.getContentType = () => { return _field.contentType;  };
  this.getHttpStatus  = () => { return _field.httpStatus;   };
  
  this.toObject = () =>  {
    return Object.assign({}, _field);
  };
  // system
  this.toJSON  = () => { return this.toObject(); }; // JSON.stringify
};


export default ResponseClass;
