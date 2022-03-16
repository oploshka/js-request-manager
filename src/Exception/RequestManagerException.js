
function RequestManagerException(code, message = '', details = null) {
  this.name = 'RequestManagerException';
  // const fullMsg = `[${code}]` + (message ? `: ${message}` : '');
  // super(fullMsg);
  this.code     = code;
  this.message  = message;
  this.details  = details;
  
  // TODO: test
  this.stack = (new Error()).stack;
}

// RequestManagerException.prototype = Error.prototype;
RequestManagerException.prototype = Object.create(Error.prototype);
RequestManagerException.prototype.constructor = RequestManagerException;


export default RequestManagerException;

/*
class RequestManagerException extends Error {
  // constructor(message) {
  //   super(message);
  //   this.message = message;
  // }

  _details = null

  constructor(code, message = '', details = null) {
    const fullMsg = `[${code}]` + (message ? `: ${message}` : '');
    super(fullMsg);
    this.name     = 'RequestManagerException';
    this.code     = code;
    this.message  = message;

    this._details = details;
  }

  getDetails(){
    return this._details;
  }

  toString() {
    return this.message;
  }
}

RequestManagerException.prototype.name = 'RequestManagerException';
*/
