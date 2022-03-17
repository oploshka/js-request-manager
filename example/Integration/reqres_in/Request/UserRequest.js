
import MethodInfo from "js-request-manager/src/Class/MethodInfo";

export default {
  
  
  getList: ({page = null}) => {
    return new MethodInfo({
      name: 'User::getList',
      type: 'GET',
      url   : 'api://users',
      get: {
        page: page
      }
    });
  },
  getById: ({userId}) => { // not found 23
    return new MethodInfo({
      name: 'User::getList',
      type: 'GET',
      url   : `api://users/${userId}`,
      responsePrepare: (respData) => {
        return respData.data;
      },
    });
  },
  create: ({name, job}) => { // response 201
    return new MethodInfo({
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
    return new MethodInfo({
      name: 'User::update',
      type: 'PUT', // or PATCH
      url   : `api://users`,
    });
  },
  delete: ({userId }) => { // response 204
    return new MethodInfo({
      name: 'User::delete',
      type: 'DELETE',
      url   : `api://users/${userId}`,
    });
  },

}
