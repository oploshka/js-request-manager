
const RequestClass = function (option) {

  let _field = {};

  const init = (option = {}) => {
    _field = {
      name            : option.name             || '',
      type            : option.type,
      url             : option.url, // RequestLinkClass(option.url);
      params          : {},
      responsePrepare : option.responsePrepare  || null,
      //
      cache           : option.cache            || false,
      errorMessage    : option.errorMessage     || '',
      // TODO: delete?
      fileName        : option.fileName  || '',
    };

    if(option.params) {
      _field.params.get   = option.params.get   || {};
      _field.params.post  = option.params.post  || {};
    }
  };

  init(option);

  this.getName            = () => { return _field.name;   };
  this.getType            = () => { return _field.type;   };
  this.getUrl             = () => { return _field.url;    };
  this.getParams          = () => { return _field.params; };
  this.getResponsePrepare = () => { return _field.responsePrepare; };
  //
  this.getCache           = () => { return _field.cache;  };
  this.getErrorMessage    = () => { return _field.errorMessage; };
  // TODO: delete?
  this.getFileName        = () => { return _field.fileName; };


  this.toObject = () =>  {
    return Object.assign({}, _field);
  };
  // system
  this.toJSON  = () => { return this.toObject(); }; // JSON.stringify
};


export default RequestClass;
