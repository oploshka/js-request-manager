
class RequestClass {

  _field;

  constructor(option = {}) {
    this._field = {
      name            : option.name             || '',
      type            : option.type,
      url             : option.url, // RequestLinkClass(option.url);
      params          : option.params,
      responsePrepare : option.responsePrepare  || null,
      //
      cache           : option.cache            || false,
      errorMessage    : option.errorMessage     || '',
      // TODO: delete?
      fileName        : option.fileName  || '',
    };

  }

  getName            () { return this._field.name;   }
  getType            () { return this._field.type;   }
  getUrl             () { return this._field.url;    }
  getParams          () { return this._field.params; }
  getResponsePrepare () { return this._field.responsePrepare; }
  //
  getCache           () { return this._field.cache;  }
  getErrorMessage    () { return this._field.errorMessage; }
  // TODO: delete?
  getFileName        () { return this._field.fileName; }


  toObject() {
    return Object.assign({}, this._field);
  }
  // system
  toJSON  () { return this.toObject(); } // JSON.stringify
}


export default RequestClass;
