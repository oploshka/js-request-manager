
class RequestLinkClass {
  _hostSchema = {}
  _linkOrigin = null;
  _linkCache  = null;

  _getLinkCache = () => {
    if(this._linkCache){
      return this._linkCache;
    }
    this._linkCache = {
      url: '',
    };

    const requestUrlArray = this._linkOrigin.split('://');

    if(requestUrlArray.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('[REQUEST MANAGER] prepareUrl not correct requestUrl', this._linkOrigin);
    }
    else if(requestUrlArray.length === 2) {
      const host = requestUrlArray[0].toLowerCase();
      if(host in this._hostSchema) {
        this._linkCache.url = this._hostSchema[ host ] + requestUrlArray[1];
      } else {
        // eslint-disable-next-line no-console
        console.warn('[REQUEST MANAGER] prepareUrl not correct hostSchema', this._linkOrigin);
      }
    }

    return this._linkCache;

  }

  constructor(link, hostSchema = {}) {
    this._hostSchema    = hostSchema;
    this._linkOrigin    = link;
    this._linkOrigin    = link;
  }

  getUrl() {
    return this._getLinkCache().url;
  }

}


export default RequestLinkClass;
