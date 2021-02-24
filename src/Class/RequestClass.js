
class RequestClass {

  #name             = null;
  #type             = null;
  #url              = null;
  #params           = null;
  #cache            = null;
  #errorMessage     = null;
  #responsePrepare  = null;
  #fileName         = null;


  constructor(option = {}) {
    this.#name            = option.name             || '';
    this.#type            = option.type;
    this.#url             = option.url; // RequestLinkClass(option.url);
    this.#params          = option.params;
    this.#cache           = option.cache            || false;
    this.#errorMessage    = option.errorMessage     || '';
    this.#responsePrepare = option.responsePrepare  || null;
    this.#fileName        = option.fileName  || '';

  }

  getName            () { return this.#name;   }
  getType            () { return this.#type;   }
  getUrl             () { return this.#url;    }
  getParams          () { return this.#params; }
  getCache           () { return this.#cache;  }
  getErrorMessage    () { return this.#errorMessage; }
  getResponsePrepare () { return this.#responsePrepare; }
  getFileName        () { return this.#fileName; }

}


export default RequestClass;
