

const RequestClass = function (option) {

  let _field = {
    name    : '',
    //
    type    : 'GET',
    url     : '',
    params  : { get:{}, post:{} },
    //
    methodSchema: null,
  };
  
  // Это внутренний класс и ответственность за корректность данных на библиотеке
  Object.assign({}, _field, option);


  this.getName            = () => { return _field.name;   };
  // переопределено
  this.getType            = () => { return _field.type;   };
  this.getUrl             = () => { return _field.url;    };
  this.getParams          = () => { return _field.params; };
  
  this.getMethodSchema    = () => { return _field.methodSchema; };
  
  // TODO: дополнить геттеры???
  
  this.toObject = () =>  {
    return Object.assign({}, _field);
  };
  // system
  this.toJSON  = () => { return this.toObject(); }; // JSON.stringify
};


export default RequestClass;
