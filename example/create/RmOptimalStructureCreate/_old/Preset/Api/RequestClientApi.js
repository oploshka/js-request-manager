
import axios from 'axios';
import AxiosRequestClient from 'js-request-manager/src/RequestClient/AxiosRequestClient';


// TODO: return function
export default Object.assign(AxiosRequestClient, {
  
  sendPrepare(axiosObject, options) {
    //
    let token = localStorage.getItem('user-token');
    if(token) {
      axiosObject.headers['Authorization'] = `Token ${token}`;
    }
    //
    return axiosObject;
  },
  
  async send(obj) {
    return await axios(obj);
  },
  
  
});
