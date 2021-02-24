class RequestManagerException extends Error {
  // constructor(message) {
  //   super(message);
  //   this.message = message;
  // }

  #details = null

  constructor(code, message = '', details = null) {
    const fullMsg = `[${code}]` + (message ? `: ${message}` : '');
    super(fullMsg);
    this.name     = 'RequestManagerException';
    this.code     = code;
    this.message  = message;

    this.#details = details;
  }

  getDetails(){
    return this.#details;
  }

  toString() {
    return this.message;
  }
}

RequestManagerException.prototype.name = 'RequestManagerException';

export default RequestManagerException;
