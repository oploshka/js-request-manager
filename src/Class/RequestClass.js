
const RequestClass = function (option) {

  let _field = {
    name    : '',
    type    : 'GET',
    url     : '',
    params  : {
      get : {},
      post: {},
    },
    fileName: option.fileName  || '',
    settings: {
      cache           : false,
      responsePrepare : null,
      errorMessage    : '',
    }
  };

  const init = (option = {}) => {

    _field.name     = option.name || '';
    _field.type     = option.type || '';
    _field.url      = option.url  || '';
    _field.fileName = option.fileName || '';

    if(option.params) {
      _field.params = Object.assign({}, _field.params, option.params);
    }
    if(option.get ) { _field.params.get   = option.get;  }
    if(option.post) { _field.params.post  = option.post; }

    for(let key in option) {
      if(key === 'params' || key === 'settings'){
        _field[key] = Object.assign({}, _field[key], option[key]);
        continue;
      }
      if(key === 'get' || key === 'post'){
        _field.params[key] = option[key];
        continue;
      }
      if(Object.prototype.hasOwnProperty.call(_field, key) ) {
        _field[key] = option[key];
        continue;
      }

      _field.settings[key] = option[key];
    }

    //
    if(option.settings) {
      _field.settings = Object.assign(_field.settings, option.settings)
    };
  };

  init(option);

  this.getName            = () => { return _field.name;   };
  this.getType            = () => { return _field.type;   };
  this.getUrl             = () => { return _field.url;    };
  this.getParams          = () => { return _field.params; };
  this.getFileName        = () => { return _field.fileName; };
  //
  this.getSettings        = () => { return _field.settings; };
  //
  this.getResponsePrepare = () => { return _field.settings.responsePrepare; };
  this.getCache           = () => { return _field.settings.cache;  };
  this.getErrorMessage    = () => { return _field.settings.errorMessage; };

  this.toObject = () =>  {
    return Object.assign({}, _field);
  };
  // system
  this.toJSON  = () => { return this.toObject(); }; // JSON.stringify
};


export default RequestClass;
