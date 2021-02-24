
export default (SendRequest) => {

  const request = {};

  request.authorize = (user) => {
    return SendRequest('POST', 'auth://v2/authorize', { post: user }, (data) => {
      if(data.jwt) {
        return {token: data.jwt};
      }
      // TODO: вызвать исключение
      return {};
    });
  };

  return request;
};
