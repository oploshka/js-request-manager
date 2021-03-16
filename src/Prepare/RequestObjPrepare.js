
// eslint-disable-next-line no-unused-vars
const RequestObjPrepare = (axiosObject, options) => {


  let token = localStorage.getItem('user-token');
  if(token) {
    axiosObject.headers['Authorization'] = `Bearer ${token}`;
  }

  return axiosObject;
};

export default RequestObjPrepare;
