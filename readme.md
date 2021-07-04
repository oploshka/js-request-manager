# Менеджер запросов к API.

Request Manager - это библиотека для создания sdk библиотеки для вашего сервера (API).
Тип API не имеет значения, будь то REST или RPC.
В итоге мы получаем возможность централизованно обрабатывать все запросы.
Мы не заморачиваемся с преобразованием данных в коде, а лишь работаем с чистыми данными.
Лучше 1 раз увидеть, чем 100 раз услышать


## Как это выглядит после настройки
async/await
```js
try {
  let responseData = RequestManager.Auth.authorization({login: 'admin', password: 'pass'})
  localStorage.setItem('user-token', responseData.token)
  alert('авторизация прошла успешно!');
} catch (err) {
  alert('не удалось авторизоваться');
  return
}
```
или Promise
```js
RequestManager.Auth.authorization({login: 'admin', password: 'pass'})
  .then(
    (result) => {
      localStorage.setItem('user-token', result.token)
      alert('авторизация прошла успешно!');
    },
    (error) => {
      alert('не удалось авторизоваться');
    }
  )
```

## Возможности

- кэшировать запросы; 
- делать пред обработку данных;
- отдавать фейковые данные;
- выводить сообщения с ошибкой
- вешать loading, logger

Многое из этого требует интеграции с вашей системой. 
Финальный функционал определять вам.

## Установка

```shell
npm install axios
npm install js-file-download
npm install js-request-manager
```
or
```js
// package.json
{
  "dependencies": {
    // ..
    "axios": "^0.21.1",
    "js-file-download": "^0.4.12",
    "js-request-manager": "^1.0.0",
    // ..
  }
}
```

## Инициализация (варианты):
   - Скопировать [файлы оптимального примера](https://github.com/oploshka/js-request-manager/tree/master/example/RequestManagerOptimal) к себе в проект (рекомендуется).
   - Скопировать [файл минимального примера](https://github.com/oploshka/js-request-manager/tree/master/example/RequestManagerBase) к себе в проект.
   - или создать файл вручную.
```js
import RequestManager from 'js-request-manager/src/RequestManager';
import RequestClass   from "js-request-manager/src/Class/RequestClass";

global.RequestManager = RequestManager({
  RequestSchema: {
    Auth: {
      authorization: ({login, password}) => {
        return new RequestClass({
          name  : 'authorization',
          type  : 'POST',
          url   : 'api://authorize', // https://domain.test/api/authorize
          params: {
            get: {},
            post: {login, password},
          },
          responsePrepare: (data) => {
            return {token: data.jwt};
          },
          errorMessage: 'Not correct login or password',
        });
      },
    }
  },
  Config: {
    hostSchema: {
      api: 'https://domain.test/api',
    },
    Hook: {
      RequestPromise (requestPromise, settings) { console.log(requestPromise, settings); }
    },
  }
});

```
   
## RequestManager принимает следующие настройки:
```js
const RequestManagerSettings = {
   RequestSchema: {}, 
   // Config - all parameters are optional
   Config: {
      hostSchema: {},
      RequestPrepare: {
         data (requestType, requestUrl, requestData) { return requestData; },
         type (requestType, requestUrl, requestData) { return requestType; },
         url (requestType, requestUrl, requestData)  { return requestUrl.getUrl(); },
         axiosObject (axiosObject, options)          { return axiosObject; },
      },
      ResponsePrepare: {
         validate (responseData) { return responseData; },
      },
      Hook: {
         RequestPromise (requestPromise, settings) { console.log(requestPromise, settings); }
      },
   }
}
```

   
### RequestManagerSettings.RequestSchema
Тут описывается все как мы будем группировать наши запросы.
```js
// schema example
const RequestSchema = {
  Auth: {
    authorization: ({login, password})        => { return new RequestClass({/* ... */}); },
    registration : ({email, login, password}) => { return new RequestClass({/* ... */}); },
  },
  News: {
    getAll : ()           => { return new RequestClass({/* ... */}); },
    getById: ({id})       => { return new RequestClass({/* ... */}); },
    getOldNews: ()        => { return new RequestClass({/* ... */}); },
    getNewNews: ()        => { return new RequestClass({/* ... */}); },
    create:({name, desc}) => { return new RequestClass({/* ... */}); },
    delete:({id})         => { return new RequestClass({/* ... */}); },
  },
  Tags: {
    News: {
      getAll : ()         => { return new RequestClass({/* ... */}); },
    },
    User: {
      getAll : ()         => { return new RequestClass({/* ... */}); },
    },
  },
  getTheme : ()           => { return new RequestClass({/* ... */}); },
};
```
Один запрос описывается функцией, которая принимает один объект и возвращает RequestClass

Пример как это вызывать
```js
RequestManager.Auth.authorization({login: 'admin', password: 'pass'});

RequestManager.News.getAll({}); // need send empty object
RequestManager.News.getById({id});

RequestManager.Tags.News.getAll({});
RequestManager.Tags.User.getAll({}).then(console.log, console.error);

RequestManager.getTheme({});
```

### RequestManagerSettings.RequestSchema RequestClass
Это класс, которым мы описываем все наши запросы.
```js
import RequestClass   from "js-request-manager/src/Class/RequestClass";

request = new RequestClass({
  name : '',      // String - request name (need for debug or custom prepare) 
  type : '',      // String - request type [GET|POST|PUT|DELETE ... or other custom ]
  url  : '',      // String - request url
  params : {
    get : {},     // Send GET params
    post: {},     // Send POST params
  },
  
  responsePrepare: (response) => { // Function
    return {token: response.jwt};  // change response
  }, 
  
  cache : false,        // Create request cache   
  errorMessage: '',     // String or Function
  // For load file
  fileName: 'test.txt', // String or Function
})

```

### RequestManagerSettings.Config
Тут мы можем изменить стандартное поведение Request Manager, подписаться на события, задать alias для url.

### RequestManagerSettings.Config.hostSchema
Задаем alias для url.
Делаем это для того, чтобы не писать полные имена доменов во всех запросах.
Пример:
```js
const hostSchema = {
   auth   : 'https://auth.domain.test/api',
   apiV1  : 'https://domain.test/api/v1',
   apiV2  : 'https://v2.domain.test/api',
};
```

В дальнейшем при описании запросов можно использовать сокращения
```js
RequestClass({ url: 'auth://authorize' /* ... */}); // url => https://auth.domain.test/api/authorize
RequestClass({ url: 'apiV1://users'    /* ... */}); // url => https://domain.test/api/v1/users
RequestClass({ url: 'apiV2://news'     /* ... */}); // url => https://v2.domain.test/api/news
```

### RequestManagerSettings.Config.RequestPrepare
В данном объекте мы можем дополнить/переопределить/изменить/удалить данные, которые будут в запросе.

### RequestManagerSettings.Config.RequestPrepare.data
Эта функция позволяет изменить/дополнить/подменить данные запроса.
Это отрабатывает для всех запросов!!!
```js
// example RequestManagerSettings.Config.RequestPrepare.data
function(requestType, requestUrl, requestData) {
  if(requestType === 'POST-REPLACE') { // add new types of queries if you understand what this is for.
     return { test: "test"} // replace requestData
  }
  
  requestData.time = Date(); // add date in send request
  
  if(requestData.debugInfo) {
    console.log(requestData.debugInfo) // view debug info
    delete requestData.debugInfo;     // delete data (debugInfo) from the request
  }
   
  if(requestData.arrayInfo) {
    requestData.arrayInfo = JSON.stringify(requestData.arrayInfo) // replace/conver data
  }
  
  return requestData;
}
```

### RequestManagerSettings.Config.RequestPrepare.type
Эта функция позволяет изменить/подменить тип запроса.
Это отрабатывает для всех запросов!!!
```js
// example RequestManagerSettings.Config.RequestPrepare.type
function(requestType, requestUrl, requestData) {
  if(requestType === 'POST-REPLACE') { // add new types of queries if you understand what this is for.
    return 'POST' // replace requestType
  }

  const allowedRequestType = {
    'GET': true,
    'POST': true,
  }
  if(!allowedRequestType[requestType]) {
    console.warn('Not correct request type', requestType)
    return 'GET'; // replace
  }
  
  return requestType; // return original request type
}
```


### RequestManagerSettings.Config.RequestPrepare.url
Эта функция позволяет изменить/подменить url запроса.
Это отрабатывает для всех запросов!!!
```js
// example RequestManagerSettings.Config.RequestPrepare.url
function(requestType, requestUrl, requestData) {
  
  if(requestType === 'POST-REPLACE') {
    return 'https://test.domain.com/test-url' // replace url
  }
  
   return requestUrl.getUrl(); // warning requestUrl - is RequestLinkClass
}
```

### RequestManagerSettings.Config.RequestPrepare.axiosObject
Эта функция позволяет изменить/подменить объект, который передается в axios.
Нужно понимать какой объект хочет получить библиотека axios.
```js
function(axiosObject, options) {
  let token = localStorage.getItem('user-token');
  if (token) {
    // add axios header
    axiosObject.headers['Authorization'] = `Token ${token}`;
  }
  return axiosObject;
}
```


### RequestManagerSettings.Config.ResponsePrepare
В данном блоке мы работаем с ответом (можем изменить)

### RequestManagerSettings.Config.ResponsePrepare.validate
Тут мы проверяем является ли ответ успешным
```js
// import RequestManagerException from "js-request-manager/src/Class/RequestManagerException";
function(responseData){
  if (!responseData.success || responseData.error ) {
    throw new RequestManagerException('BACKEND_ERROR', responseData.error, responseData);
  }
  return responseData;
};
```


### RequestManagerSettings.Config.Hook
Hook - можем подписаться на события Request Managera

### RequestManagerSettings.Config.Hook.RequestPromise
Данное событие вызывается после того как запрос отправлен.
Применим для loading, ведения статистики, логирования, вывода сообщений об ошибках
```js
function(requestPromise, settings){
  requestPromise.then(
    (result) => {},
    (error) => {
      alert(settings.errorMessage) // alert error
    });
};
```
