
class RequestLinkClass {
  #hostSchema = {}
  #linkOrigin = null;
  #linkCache  = null;

  #getLinkCache = () => {
    if(this.#linkCache){
      return this.#linkCache;
    }
    this.#linkCache = {
      url: '',
    };

    const requestUrlArray = this.#linkOrigin.split('://');

    if(requestUrlArray.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('[REQUEST MANAGER] prepareUrl not correct requestUrl', this.#linkOrigin);
    }
    else if(requestUrlArray.length === 2) {
      const host = requestUrlArray[0].toLowerCase();
      if(host in this.#hostSchema) {
        this.#linkCache.url = this.#hostSchema[ host ] + requestUrlArray[1];
      } else {
        // eslint-disable-next-line no-console
        console.warn('[REQUEST MANAGER] prepareUrl not correct hostSchema', this.#linkOrigin);
      }
    }

    return this.#linkCache;

  }

  constructor(link, hostSchema = {}) {
    this.#hostSchema    = hostSchema;
    this.#linkOrigin    = link;
    this.#linkOrigin    = link;
  }

  getUrl() {
    return this.#getLinkCache().url;
  }

}


export default RequestLinkClass;
