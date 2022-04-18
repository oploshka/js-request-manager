
const RequestLinkClass = function(link, hostAlias = {}) {
  let _hostAlias = {};
  let _linkOrigin = null;
  let _linkCache  = null;

  this.getLinkCache = () => {
    if(_linkCache){
      return _linkCache;
    }
    _linkCache = {
      url: _linkOrigin,
    };

    const requestUrlArray = _linkOrigin.split('://');

    if(requestUrlArray.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('[REQUEST MANAGER] prepareUrl not correct requestUrl', _linkOrigin);
    }
    else if(requestUrlArray.length === 2) {
      const host = requestUrlArray[0].toLowerCase();
      if(host in _hostAlias) {
        _linkCache.url = _hostAlias[ host ] + requestUrlArray[1];
      } else {
        // eslint-disable-next-line no-console
        console.warn('[REQUEST MANAGER] prepareUrl not correct hostAlias', _linkOrigin);
      }
    }

    return _linkCache;

  };

  this.getUrl = () => {
    return this.getLinkCache().url;
  };

  const init = (link, hostAlias) => {
    _hostAlias    = hostAlias;
    _linkOrigin    = link;
  };
  init(link, hostAlias);
};


export default RequestLinkClass;
