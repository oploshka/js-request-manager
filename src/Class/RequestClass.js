
class RequestClass {

  #field;

  constructor(option = {}) {
    this.#field = {
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

  getName            () { return this.#field.name;   }
  getType            () { return this.#field.type;   }
  getUrl             () { return this.#field.url;    }
  getParams          () { return this.#field.params; }
  getResponsePrepare () { return this.#field.responsePrepare; }
  //
  getCache           () { return this.#field.cache;  }
  getErrorMessage    () { return this.#field.errorMessage; }
  // TODO: delete?
  getFileName        () { return this.#field.fileName; }


  toObject() {
    return Object.assign({}, this.#field);
  }
  // system
  toJSON  () { return this.toObject(); } // JSON.stringify
}


export default RequestClass;
