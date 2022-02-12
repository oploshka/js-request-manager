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

function RequestManagerException(code, message = '', details = null) {
  this.name = "RequestManagerException";
  // const fullMsg = `[${code}]` + (message ? `: ${message}` : '');
  // super(fullMsg);
  this.code     = code;
  this.message  = message;

  this.details = details;
}
RequestManagerException.prototype = Error.prototype;


export default RequestManagerException;
