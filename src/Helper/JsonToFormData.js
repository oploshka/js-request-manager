/*
function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

const jsonToFormData = function(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
};
*/
function objectToFormData(obj, rootName, ignoreList) {
  const formData = new FormData();

  function appendFormData(data, root) {
    if (!ignore(root)) {
      root = root || '';
      if (data instanceof File) {
        formData.append(root, data);
      }
      else if (data instanceof FileClass) {
        let file = data.getFile();
        /*
          lastModified: 1517902190000
          lastModifiedDate: Tue Feb 06 2018 10:29:50 GMT+0300 (Москва, стандартное время) {}
          name: "npm121334.png"
          size: 2816
          type: "image/png"
          webkitRelativePath: ""
        */
        (file && file.size) && formData.append(root, file);
      } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          appendFormData(data[i], root + '[' + i + ']');
        }
      } else if (typeof data === 'object' && data) {
        for (var key in data) {
          if ( Object.prototype.hasOwnProperty.call(data, key) ) {
            if (root === '') {
              appendFormData(data[key], key);
            } else {
              let delimiter = (root.slice(-1) === ']') ? '' : '.';
              appendFormData(data[key], root +  delimiter + key);
            }
          }
        }
      } else {
        if (data !== null && typeof data !== 'undefined') {
          formData.append(root, data);
        }
      }
    }
  }

  function ignore(root){
    return Array.isArray(ignoreList)
      && ignoreList.some(function(x) { return x === root; });
  }

  appendFormData(obj, rootName);

  return formData;
}

export default objectToFormData;

/*
const my_data = {
  num: 1,
  falseBool: false,
  trueBool: true,
  empty: '',
  und: undefined,
  nullable: null,
  date: new Date(),
  name: 'str',
  another_object: {
    name: 'my_name',
    value: 'whatever'
  },
  array: [
    {
      key1: {
        name: 'key1'
      }
    }
  ]
};

jsonToFormData(my_data)
*/
