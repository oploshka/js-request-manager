import {isEmpty} from './Helper';

function MergeUrlAndGetObj(url, getObj = null) {
  
  // get params
  if(!isEmpty(getObj)){
    let params = '';
    for(let key in params.get){
      if(params.get[key] === null) {
        continue;
      }
      params += (params ? '&' : '') + encodeURIComponent(key) + '=' + encodeURIComponent(params.get[key])
    }
    
    if (fetchUrl.includes('?')){
      url += (params ? '&' : '') + params;
    } else {
      url += (params ? '?' : '') + params;
    }
  }

  return url;
}

export default MergeUrlAndGetObj;