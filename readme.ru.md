# Менеджер запросов к API.

Request Manager - это библиотека для создания sdk библиотеки для вашего сервера (API).
Тип API не имеет значения, будь то REST или RPC.
В итоге мы получаем возможность централизованно обрабатывать все запросы.
Мы не заморачиваемся с преобразованием данных в коде, а лишь работаем с чистыми данными.
Лучше 1 раз увидеть, чем 100 раз услышать.

[Documentation in English](readme.md)

# Как это выглядит после настройки
### async/await
```js
try {
  let responseData = await RequestManager.Auth.authorization({login: 'admin', password: 'pass'})
  // ... user code for success response
} catch (err) {
  // ... user code for error response or server error
  return;
}
```
### Promise
```js
RequestManager.Auth.authorization({login: 'admin', password: 'pass'}).then(
  (result)  => { /* ... user code for success response */ },
  (error)   => { /* ... user code for error response or server error */ }
);
```

# Установка

<details open>
<summary><b style="font-size: 1.3em;">NPM</b></summary>

```shell
# # install a request client, such as axios or fetch (or any other)
# npm install axios              # for use axios client
# npm install node-fetch         # for use fetch client in nodejs
# # install file download (if necessary)
# npm install js-file-download   # for file download (or use other)
# # install
npm install js-request-manager
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Yarn</b></summary>

```shell
# # install a request client, such as axios or fetch (or any other)
# yarn add axios              # for use axios client
# yarn add node-fetch         # for use fetch client in nodejs
# # install file download (if necessary)
# yarn add js-file-download   # for file download (or use other)
# # install
yarn add js-request-manager
```
</details>

<details>
<summary><b style="font-size: 1.3em;">package.json</b></summary>

```json5
{
  "dependencies": {
    // "axios": "^0.21.1", or "node-fetch": "^2.6.1", or js fetch()
    // js-file-download": "^0.4.12", or other 
    "js-request-manager": "^1.0.0",
    // ..
  }
}
```
</details>


# Инициализация (варианты):
   - Скопировать [файлы оптимального примера](https://github.com/oploshka/js-request-manager/tree/develop/example/create/RmOptimalStructureCreate) к себе в проект (рекомендуется).
   - Скопировать [файл минимального примера](https://github.com/oploshka/js-request-manager/tree/develop/example/create/RmSimpleCreate) к себе в проект.
   - или создать файл вручную.

<details>
<summary><b style="font-size: 1.3em;">Пример создания вручную</b></summary>

> ```js
> import RequestManager from 'js-request-manager/src/RequestManager';
> import RequestClass   from "js-request-manager/src/Class/RequestClass";
> // request sender
> import axios from 'axios';
> 
> const requestSchema = {
>   Auth: {
>     authorization: ({login, password}) => {
>       return new RequestClass({
>         name  : 'authorization',
>         type  : 'POST',
>         url   : 'api://authorize', // https://domain.test/api/authorize
>         params: {
>           get: {},
>           post: {login, password},
>         },
>         responsePrepare: (data) => {
>           return {token: data.jwt};
>         },
>         errorMessage: 'Not correct login or password',
>       });
>     },
>   }
> }
> 
> const Config = {
>   hostAlias: {
>     api: 'https://domain.test/api',
>   },
>   Hook: {
>     RequestPromise (requestPromise, settings) { console.log(requestPromise, settings); }
>   },
>   RequestClient: {
>     async send(obj) { return await axios(obj); }
>   }
> }
> 
> const RmSimpleCreate = RequestManager(requestSchema, Config);
> 
> // optional (recommended use global request manager)
> global.RequestManager = RmSimpleCreate
> 
> export default RmSimpleCreate
> 
> ```
</details>


# RequestManager принимает следующие настройки:
```js
const RequestSchema = {/* ... request schema */ };

// Config - all parameters are optional
const Config = {
  hostAlias: {},
  RequestPrepare: {
    data(requestType, requestUrl, requestData) {
      return requestData;
    },
    type(requestType, requestUrl, requestData) {
      return requestType;
    },
    url(requestType, requestUrl, requestData) {
      return requestUrl.getUrl();
    },
    requestClientDataPrepare(requestClientData, requestClass) {
      return requestClientData;
    },
  },
  ResponsePrepare: {
    isError(riObject) {
      return false;
    },
    getErrorInfo: async (riObject, requestClass, Config) => {
      return {code: 'error', message: 'Undefined error', data: riObject}
    },
    getSuccessInfo: async (riObject, requestClass, Config) => {
      return riObject.data
    },
  },
  Hook: {
    RequestPromise(requestPromise, settings) {
      console.log(requestPromise, settings);
    }
  },
  RequestClient: {
    name: 'AXIOS', // or FETCH
    async send(obj) {
      return await axios(obj);
    },
    async fileDownload(data, ri, requestClass, Config) {
      // add file download code
      return {};
    },
    getRequestClientObject(requestObj, requestClass, Config) {
      return requestObj;
    },
    isNetworkError(axiosResponse, requestClass, Config) {
      return false;
    }
    getRiObject(axiosResponse, requestClass, Config) {
      return {httpStatus: 200, contentType: '', data: {}, headers: {}};
    }
  }
}
```


## RequestSchema setting information

Тут описывается как мы будем группировать все наши запросы, какие параметры они будут принимать и в каком виде их отсылать.
Так же можем изменить или подменить данные ответа.

<details>
<summary><b style="font-size: 1.3em">RequestSchema</b></summary>

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

RequestManager.News.getAll();
RequestManager.News.getById({id});

RequestManager.Tags.News.getAll();
RequestManager.Tags.User.getAll({}).then(console.log, console.error);

RequestManager.getTheme();
```
</details>

<details>
<summary><b style="font-size: 1.3em;">RequestSchema RequestClass</b></summary>

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
</details>


## Config setting information

Тут мы можем изменить стандартное поведение Request Manager, подписаться на события, задать alias для url.
Далее можно посмотреть детальную информацию по RequestSchema и Config

Config будут описан в форме Config.[Тип настроек].[Подтип настроек] = [Настройка]

------------------------------------------------------

<details>
<summary><b style="font-size: 1.3em;">Config.hostAlias</b></summary>

Задаем alias для url.
Делаем это для того, чтобы не писать полные имена доменов во всех запросах.
Пример:
```js
const hostAlias = {
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
</details>

------------------------------------------------------

<details open>
<summary><b style="font-size: 1.3em;">Config.RequestPrepare</b></summary>

В данном объекте мы можем дополнить/переопределить/изменить/удалить данные, которые будут в запросе.
RequestPrepare является объектом. Смотри параметры (ниже) в Config.RequestPrepare.[Подтип настроек].

</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestPrepare.data</b></summary>


Эта функция позволяет изменить/дополнить/подменить данные запроса.
Это отрабатывает для всех запросов!!!
```js
// example Config.RequestPrepare.data
function RequestPrepare_data(requestType, requestUrl, requestData) {
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
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestPrepare.type</b></summary>

Эта функция позволяет изменить/подменить тип запроса.
Это отрабатывает для всех запросов!!!
```js
// example Config.RequestPrepare.type
function RequestPrepare_type(requestType, requestUrl, requestData) {
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
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestPrepare.url</b></summary>

Эта функция позволяет изменить/подменить url запроса.
Это отрабатывает для всех запросов!!!
```js
// example Config.RequestPrepare.url
function RequestPrepare_url(requestType, requestUrl, requestData) {
  
  if(requestType === 'POST-REPLACE') {
    return 'https://test.domain.com/test-url' // replace url
  }
  
   return requestUrl.getUrl(); // warning requestUrl - is RequestLinkClass
}
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestPrepare.requestClientDataPrepare</b></summary>

Эта функция позволяет изменить объект передаваемый в axios или fetch.
Добавить заголовки, настройки и тп.

```js
function RequestPrepare_requestClientDataPrepare(requestClientData, requestClass) {
  let token = localStorage.getItem('user-token');
  if (token) {
    // add axios header
    requestClientData.headers['Authorization'] = `Token ${token}`;
  }
  return requestClientData;
},
```

ps: это общий callback
</details>

------------------------------------------------------

<details open>
<summary><b style="font-size: 1.3em;">Config.ResponsePrepare</b></summary>

В данном блоке мы работаем с ответом (можем изменить).
ResponsePrepare является объектом.
Смотри параметры (ниже) в Config.ResponsePrepare.[Подтип настроек].
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.ResponsePrepare.isError</b></summary>

Тут мы проверяем является ли ответ ошибкой 
```js
function ResponsePrepare_isError(responseData){
  if( !(200 <= riObject.httpStatus && riObject.httpStatus < 300) ) {
    return true;
  }
  if(!riObject.data.success) {
    return true;
  }
  return false;
};
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.ResponsePrepare.getErrorInfo</b></summary>

Если ResponsePrepare_isError - true, то мы пытаемся получить информацию об ошибке.
Данную информацию отдаем в виде объекта.
```js
async function ResponsePrepare_getErrorInfo(riObject, requestClass, Config) => {
  return {
    code: 'error',
    message: riObject.data.error || 'Неизвестная ошибка',
    data: riObject.data,
  };
};
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.ResponsePrepare.getSuccessInfo</b></summary>

Если ResponsePrepare_isError - false, то мы получаем чистые данные из ответа.
Рассмотрим на примере ответа:

```json5
{ "success": true, "result": { "a": 1, "b": 2} } 
```
В данном случае, мы хотим получить - { "a": 1, "b": 2}. Для этого используем следующий код: 

```js
async function ResponsePrepare_getSuccessInfo(riObject, requestClass, Config) => {
  return riObject.data.result;
};
```

</details>

------------------------------------------------------

<details open>
<summary><b style="font-size: 1.3em;">Config.Hook</b></summary>

Hook - можем подписаться на события Request Managera.
Hook является объектом.
Смотри параметры (ниже) в Config.Hook.[Подтип настроек].
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.Hook.RequestPromise</b></summary>

Данное событие вызывается после того как запрос отправлен.
Применим для loading, ведения статистики, логирования, вывода сообщений об ошибках
```js
function Hook_RequestPromise(requestPromise, settings){
  requestPromise.then(
    (result) => {},
    (error) => {
      alert(settings.errorMessage) // alert error
    });
};
```
</details>

------------------------------------------------------

<details open>
<summary><b style="font-size: 1.3em;">Config.RequestClient</b></summary>

Набор функция позволяет определить, через что мы будем отсылать запрос.
Обычно используется axios или fetch (можно использовать и другие). 
В примерах ниже мы будем использовать axios.

В 99% необходимо передать axios. Делается это через Config.RequestClient.send.
Остальное должно работать корректно!
Для добавления пользовательских токенов, заголовков (и тп) в axiosObj используйте "Config.RequestPrepare.requestClientDataPrepare"

Переопределение остального имеет смысл, если вы используете другой клиент для отправки
или axios выпустили новую версию (не совместимую со старой).

ps: Стоит отметить axios на фронте и на беке - ведет себя немного по разному

</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.name</b></summary>

Тут мы говорим, какой пресет Config.RequestClient использовать (AXIOS | FETCH).
По дефолту будет использоваться пресет AXIOS.
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.send</b></summary>

Тут мы говорим, что отправка будет через "axios".
```js
import axios from 'axios';

async function RequestClient_send(obj) {
  return await axios(obj);
},
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.fileDownload</b></summary>

Тут мы говорим, что мы будет загружать файлы.
```js
import fileDownload from 'js-file-download';

async fileDownload(data, ri, requestClass, Config) {
  const download = async (data, ri, requestClass, Config) => {
    let fileName = requestClass.getFileName();
    fileDownload(ri.data, fileName, ri.contentType);
  }
  download(data, ri, requestClass, Config)
  return {};
}
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.getRequestClientObject</b></summary>

Данная настройка работает корректно в большинстве случаев. 
Не нужно ее переопределять без острой необходимости!
Для добавления пользовательских токенов, заголовков (и тп) в axiosObj используйте "Config.RequestPrepare.requestClientDataPrepare"
Тут мы конвертируем данные из объекта запроса RequestManagera в объект axios. Только конвертируем!
```js
function getRequestClientObject(requestObj, requestClass, Config) {
  const axiosObj = {
    method  : requestObj.type,
    url     : requestObj.url,
    headers : {}
  };
  // axiosObj.responseType = 'application/json';

  if(requestClass.getFileName()){
    axiosObj.responseType = 'blob';
  }

  if(!isEmpty(requestObj.data.get)){
    axiosObj.params  = requestObj.data.get;
  }

  if(!isEmpty(requestObj.data.post)){
    axiosObj.data    = requestObj.data.post;
  }

  if(requestObj.data.post instanceof FormData){
    axiosObj.data    = requestObj.data.post;
    axiosObj.headers['Content-Type'] = 'multipart/form-data';
  }

  return axiosObj;
},
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.isNetworkError</b></summary>

В js сетевые ошибки не могут получить много информации. 
При возникновении сетевых ошибок, мы их обрабатываем отдельно.
Если это сетевая ошибка - то вернем сообщение с текстом ошибки.

Данная настройка работает корректно в большинстве случаев.
Не нужно ее переопределять без острой необходимости!
```js
function isNetworkError(axiosResponse, requestClass, Config) {
  if(/* axiosResponse.isAxiosError && */ !axiosResponse.response) {
    return axiosResponse.message ? axiosResponse.message : 'Неизвестная сетевая ошибка';
  }
},
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.getRiObject</b></summary>

Вытаскиваем информацию из ответа в riObject (внутренний тип Request Manager).

Данная настройка работает корректно в большинстве случаев.
Не нужно ее переопределять без острой необходимости!
```js
function getRiObject(axiosResponse, requestClass, Config) {

  const ri = {
    httpStatus  : -1,
    contentType : '',
    data        : {},
    headers     : {}
  }
  const clearContentType = (contentType) => {
    return contentType ? contentType.split(';')[0] : '';
  }

  // get status
  if(axiosResponse.status) {
    ri.httpStatus = axiosResponse.status;
  } else if(axiosResponse.request &&  axiosResponse.request.status) {
    ri.httpStatus = axiosResponse.request.status;
  }

  // get headers
  if(axiosResponse.headers) {
    ri.headers = axiosResponse.headers;
  }

  // get contentType
  if( ri.headers['content-type']) {
    ri.contentType = clearContentType( axiosResponse.headers['content-type'] );
  }

  // get data
  if(axiosResponse.data){
    ri.data = axiosResponse.data;

    if(ri.data instanceof Blob){
      ri.contentType = clearContentType( ri.data.type );
    }
  }

  return ri;
},
```

</details>

------------------------------------------------------


# Преимущества

- Возможность интегрировать в любой js проект (webpack, Vue, React, Next, Nuxt, Angular и ...).
- 1 точка отправки для всех запросов.
- Возможность создать sdk и переиспользовать в разных проектах.
- Удобство использования (группировка по типам, единообразие, response prepare).
- Кэширование запросов (опционально, по умолчанию выключено).
- Работа с фейковыми данными.
- Использование глобальных обработчиков ошибок (user notify)
- Logger, Statistics, Loading, ...

Многое из этого требует интеграции с вашей системой.
Финальный функционал определять вам.


# Недостатки

- Нет возможности сделать универсальное решение (разнообразие API не знает границ). 
  Возможно, кому то потребуются доп. функционал. 
  Такие случаи сведены к миниму, но все же они могут случится.
- Сложность. Интеграция с API требует опыта. Нужно понимать, что и где происходит.
  Данное решение это упрощает, но всегда хочется проще...
- Решение расчитано на общение через json. 
  Для работы с другими форматами (xml, yaml, ...) 
  возможно потребуется использовать дополнительные библиотеки.
