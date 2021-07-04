
import AuthRequest              from '@requestManager/Request/AuthRequest';
import ReferenceRequest         from '@requestManager/Request/ReferenceRequest';
import NewsRequest              from "@requestManager/Request/NewsRequest";

const RequestSchema = {
  Auth            : AuthRequest,
  Reference       : ReferenceRequest,
  News            : NewsRequest,
};

export default RequestSchema;
