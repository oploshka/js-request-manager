
import AuthRequest              from './Request/AuthRequest';
import ReferenceRequest         from './Request/ReferenceRequest';
import NewsRequest              from "./Request/NewsRequest";

const RequestSchema = {
  Auth            : AuthRequest,
  Reference       : ReferenceRequest,
  News            : NewsRequest,
};

export default RequestSchema;
