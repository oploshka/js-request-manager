import RequestClass   from "js-request-manager/src/Class/RequestClass";
import RequestManager from "js-request-manager/src/RequestManager";

import axios from 'axios';

/**
 * @name ReqresAPIRequestSchemaObject
 */
const ReqresAPIRequestSchema =  {
  Test: {
    getTestJson: () => {
      return new RequestClass({
        name  : 'Test::getTestJson',
        type  : 'GET',
        url   : 'api://users',
      });
    },
  },

  User: {
    getList: ({page = null}) => {
      return new RequestClass({
        name: 'User::getList',
        type: 'GET',
        url   : 'api://users',
        get: {
          page: page
        }
      });
    },
    getById: ({userId}) => { // not found 23
      return new RequestClass({
        name: 'User::getList',
        type: 'GET',
        url   : `api://users/${userId}`,
        responsePrepare: (respData) => {
          return respData.data;
        },
      });
    },
    create: ({name, job}) => { // response 201
      return new RequestClass({
        name: 'User::create',
        type: 'POST',
        url   : `api://users`,
      });
    },
    /**
     * @param {Number} userId
     * @param {Object} user
     * @param {String} user.name
     * @param {String} user.job
     * @return {Promise}
     */
    update: ({userId, user }) => { // response 201
      return new RequestClass({
        name: 'User::update',
        type: 'PUT', // or PATCH
        url   : `api://users`,
      });
    },
    delete: ({userId }) => { // response 204
      return new RequestClass({
        name: 'User::delete',
        type: 'DELETE',
        url   : `api://users/${userId}`,
      });
    },

  },

};

/**
 * @alias ReqresAPIRequestSchemaObject need fix return value {RequestClass} in {Promise}
 */
export default RequestManager(ReqresAPIRequestSchema,{
  hostSchema: {
    api: "https://reqres.in/api/"
  },
  RequestClient: {
    async send(obj) { return await axios(obj); }
  }
});
