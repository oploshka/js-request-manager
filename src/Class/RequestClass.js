
class RequestClass {

  #name             = null;
  #type             = null;
  #url              = null;
  #params           = null;
  #responsePrepare  = null;
  //
  #cache            = null;
  #errorMessage     = null;
  // TODO: delete?
  #fileName         = null;


  constructor(option = {}) {
    this.#name            = option.name             || '';
    this.#type            = option.type;
    this.#url             = option.url; // RequestLinkClass(option.url);
    this.#params          = option.params;
    this.#responsePrepare = option.responsePrepare  || null;
    //
    this.#cache           = option.cache            || false;
    this.#errorMessage    = option.errorMessage     || '';
    // TODO: delete?
    this.#fileName        = option.fileName  || '';

  }

  getName            () { return this.#name;   }
  getType            () { return this.#type;   }
  getUrl             () { return this.#url;    }
  getParams          () { return this.#params; }
  getResponsePrepare () { return this.#responsePrepare; }
  //
  getCache           () { return this.#cache;  }
  getErrorMessage    () { return this.#errorMessage; }
  // TODO: delete?
  getFileName        () { return this.#fileName; }

}


export default RequestClass;
