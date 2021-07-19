# API request Manager.

Request Manager is a library for creating an sdk library for your server (API).
The API type doesn't matter, whether it's REST or RPC.
As a result, we get the opportunity to centrally process all requests.
We do not bother with converting data in the code, but only work with pure data.
It is better to see 1 time than to hear 100 times.

[Documentation in Russian](readme.ru.md)

# How it looks after setting up
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

# Installation

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


# Initialization (options):
   - Copy [optimal example files](https://github.com/oploshka/js-request-manager/tree/master/example/create/RmOptimalStructureCreate) to your project (recommended).
   - Copy [minimal example file](https://github.com/oploshka/js-request-manager/tree/master/example/create/RmSimpleCreate) to your project.
   - or create a file manually.

<details>
<summary><b style="font-size: 1.3em;">Example of manual creation</b></summary>

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
>   hostSchema: {
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


# RequestManager accepts the following settings:
```js
const RequestSchema = {/* ... request schema */ };

// Config - all parameters are optional
const Config = {
  hostSchema: {},
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

It describes how we will group all our requests, what parameters they will accept and in what form they will be sent.
We can also change or replace the response data.

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
A single request is described by a function that accepts a single object and returns RequestClass

An example of how to call it
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

This is the class that we use to describe all our queries.
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

Here we can change the standard behavior of the Request Manager, subscribe to events, set an alias for the url.
Next, you can see detailed information on RequestSchema and Config

Config will be described in the form Config.[Type].[Sub type] = [Settings]

------------------------------------------------------

<details>
<summary><b style="font-size: 1.3em;">Config.hostSchema</b></summary>

Setting an alias for the url.
We do this in order not to write full domain names in all requests.
Example:
```js
const hostSchema = {
   auth   : 'https://auth.domain.test/api',
   apiV1  : 'https://domain.test/api/v1',
   apiV2  : 'https://v2.domain.test/api',
};
```

In the future, you can use abbreviations when describing queries
```js
RequestClass({ url: 'auth://authorize' /* ... */}); // url => https://auth.domain.test/api/authorize
RequestClass({ url: 'apiV1://users'    /* ... */}); // url => https://domain.test/api/v1/users
RequestClass({ url: 'apiV2://news'     /* ... */}); // url => https://v2.domain.test/api/news
```
</details>

------------------------------------------------------

<details open>
<summary><b style="font-size: 1.3em;">Config.RequestPrepare</b></summary>

In this object, we can add/redefine/change/delete the data that will be in the request.
RequestPrepare is an object. See the parameters (below) in Config.RequestPrepare.[Settings subtype].

</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestPrepare.data</b></summary>


This function allows you to change/supplement / replace the request data.
This works for all requests!!!
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

This function allows you to change / replace the request type.
This works for all requests!!!
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

This function allows you to change/replace the request url.
This works for all requests!!!
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

This function allows you to change the object passed to axios or fetch.
Add headers, settings, etc.

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

ps: this is a general callback
</details>

------------------------------------------------------

<details open>
<summary><b style="font-size: 1.3em;">Config.ResponsePrepare</b></summary>

In this block, we are working with the answer (we can change it).
ResponsePrepare is an object.
See the parameters (below) in Config.ResponsePrepare.[Settings subtype].
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.ResponsePrepare.isError</b></summary>

Here we check whether the answer is an error
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

If ResponsePrepare_isError is true, then we are trying to get information about the error.
We give this information in the form of an object.
```js
async function ResponsePrepare_getErrorInfo(riObject, requestClass, Config) => {
  return {
    code: 'error',
    message: riObject.data.error || 'Unknown error',
    data: riObject.data,
  };
};
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.ResponsePrepare.getSuccessInfo</b></summary>

If ResponsePrepare_isError is false, then we get clean data from the response.
Let's look at the example of the answer:

```json5
{ "success": true, "result": { "a": 1, "b": 2} } 
```
In this case, we want to get - {"a": 1, "b": 2}. To do this, use the following code:

```js
async function ResponsePrepare_getSuccessInfo(riObject, requestClass, Config) => {
  return riObject.data.result;
};
```

</details>

------------------------------------------------------

<details open>
<summary><b style="font-size: 1.3em;">Config.Hook</b></summary>

Hook - we can subscribe to Request Managera events.
Hook is an object.
See the parameters (below) in Config. Hook.[Subtype of settings].
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.Hook.RequestPromise</b></summary>

This event is called after the request is sent.
It is applicable for loading, maintaining statistics, logging, and displaying error messages
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

This function allows you to determine through which we will send the request.
Usually axios or fetch is used (you can use others as well).
In the examples below, we will use axios.

In 99%, it is necessary to pass axios. This is done via Config.RequestClient.send.
The rest should work correctly!
To add custom tokens, headers (and so on) to axiosObj, use " Config.RequestPrepare.requestClientDataPrepare"

Overriding the rest makes sense if you are using a different client for sending
or axios has released a new version (not compatible with the old one).

ps: It is worth noting axios on the front and on the back - behaves a little differently

</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.name</b></summary>

Here we are talking about which preset Config.RequestClient to use (AXIOS | FETCH).
By default, the AXIOS preset will be used.
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.send</b></summary>

Here we say that the sending will be via "axios".
```js
import axios from 'axios';

async function RequestClient_send(obj) {
  return await axios(obj);
},
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.fileDownload</b></summary>

Here we say that we will upload files.
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

This setting works correctly in most cases.
There is no need to redefine it without an urgent need!
To add custom tokens, headers (and so on) to axiosObj, use " Config.RequestPrepare.requestClientDataPrepare"
Here we convert the data from the RequestManagera request object to an axios object. We only convert it!
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

In js, network errors can't get much information.
If network errors occur, we handle them separately.
If this is a network error , we will return a message with the error text.

This setting works correctly in most cases.
There is no need to redefine it without an urgent need!
```js
function isNetworkError(axiosResponse, requestClass, Config) {
  if(/* axiosResponse.isAxiosError && */ !axiosResponse.response) {
    return axiosResponse.message ? axiosResponse.message : 'Unknown network error';
  }
},
```
</details>

<details>
<summary><b style="font-size: 1.3em;">Config.RequestClient.getRiObject</b></summary>

We pull the information from the response to riObject (internal type of Request Manager).

This setting works correctly in most cases.
There is no need to redefine it without an urgent need!
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


# Advantages

- Ability to integrate into any js project (webpack, Vue, React, Next, Nuxt, Angular and ...).
- 1 sending point for all requests.
- The ability to create an sdk and reuse it in different projects.
- Ease of use (grouping by type, uniformity, response prepare).
- Query caching (optional, disabled by default).
- Working with fake data.
- Use of global error handlers (user notify)
- Logger, Statistics, Loading, ...

A lot of this requires integration with your system.
The final functionality is up to you to determine.


# Disadvantages

- There is no way to make a universal solution (the variety of APIs knows no boundaries).
  Perhaps someone will need additional functionality.
  Such cases are reduced to a minimum, but they can still happen.
- Complexity. Integration with the API requires experience. You need to understand what is happening and where.
  This solution makes it easier, but I always want it easier...
- The solution is designed for communication via json.
  To work with other formats (xml, yaml,...)
  , you may need to use additional librari
