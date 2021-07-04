
import {isString, isFunction} from 'js-request-manager/src/Helper/Helper';

const GetErrorMessage = (obj, error) => {
  let message = '';
  switch (true) {
    case isString(obj):
      if(obj === '') {
        message = error.message; // toString();
      } else {
        message = obj + "\n\nДетали по ошибке:\n" + error.message; // toString();
      }
      break;
    case isFunction(obj):
      message = obj(error);
      break;
  }
  return message;
};

const ShowErrorMessage = (message) => {
  global.VueApp && global.VueApp.$dialogs && global.VueApp.$dialogs.alert(message, {title: 'Ошибка'});
};


export default {
  RequestPromise(requestPromise, settings) {

    if(window.VueApp) {
      window.VueApp.$store.dispatch('loading/addRequest', requestPromise);
    }

    requestPromise.then(
      (result) => {
      },
      (error) => {
        // error message
        let message = GetErrorMessage(settings.errorMessage, error);
        message && ShowErrorMessage(message);
      });

  }
};


