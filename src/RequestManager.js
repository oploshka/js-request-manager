import Auth             from './group/Auth';

const RequestManager = (SendRequest) => {

  return {
    Auth            : Auth(SendRequest),
  };
};

export default RequestManager;
