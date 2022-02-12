
const RequestLinkClass = function(link, hostSchema = {}) {
  let _hostSchema = {};
  let _linkOrigin = null;
  let _linkCache  = null;

  this.getLinkCache = () => {
    if(_linkCache){
      return _linkCache;
    }
    _linkCache = {
      url: '',
    };

    const requestUrlArray = _linkOrigin.split('://');

    if(requestUrlArray.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('[REQUEST MANAGER] prepareUrl not correct requestUrl', _linkOrigin);
    }
    else if(requestUrlArray.length === 2) {
      const host = requestUrlArray[0].toLowerCase();
      if(host in _hostSchema) {
        _linkCache.url = _hostSchema[ host ] + requestUrlArray[1];
      } else {
        // eslint-disable-next-line no-console
        console.warn('[REQUEST MANAGER] prepareUrl not correct hostSchema', _linkOrigin);
      }
    }

    return _linkCache;

  };

  this.getUrl = () => {
    return this.getLinkCache().url;
  };

  const init = (link, hostSchema) => {
    _hostSchema    = hostSchema;
    _linkOrigin    = link;
  };
  init(link, hostSchema);
};


export default RequestLinkClass;
