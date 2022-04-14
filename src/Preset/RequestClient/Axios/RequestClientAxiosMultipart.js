
import * as RequestClientAxios from './RequestClientAxios';
import { isEmpty} from '../../../Core/Is';
import JsonToFormData from '../../../Utils/JsonToFormData';

export const requestToClientObject = (requestClass) => {
  const axiosObj = {
    method  : requestClass.getType(),
    url     : requestClass.getUrl(),
    headers : {
      'Content-Type': 'multipart/form-data'
    }
  };
  // axiosObj.responseType = 'application/json';
  
  if(requestClass.getMethodInfo().getFileName())     { axiosObj.responseType = 'blob'; }
  const params = requestClass.getParams()
  if(!isEmpty(params.get))  { axiosObj.params  = params.get; }
  if(!isEmpty(params.post)) { axiosObj.data    = JsonToFormData(params.post); }
  
  return axiosObj;
};

export const prepareClientObject      = RequestClientAxios.prepareClientObject;
export const send                     = RequestClientAxios.send;
export const isNetworkError           = RequestClientAxios.isNetworkError;
export const clientResponseToObject   = RequestClientAxios.clientResponseToObject;
