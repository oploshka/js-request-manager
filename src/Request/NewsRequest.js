
import RequestClass from "@requestManager/Class/RequestClass";

export default {

  getNewsList: () => {
    return new RequestClass({
      name: 'getNewsList',
      type: 'GET',
      url: 'api://news',
      params: {
        get: {},
        post: {},
      },
      errorMessage: `Не удалось получить список новостей`
    });
  },

  getNewsById: ({id}) => {
    return new RequestClass({
      name: 'getTransactionInfo',
      type: 'GET',
      url: 'api://news/' + id,
      params: {
        get: {},
        post: {},
      },
      errorMessage: `Новость ${id} не найдена`
    });
  },

}
