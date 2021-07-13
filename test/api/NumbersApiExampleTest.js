
const assert = require('chai').assert
import RmNumber from "js-request-manager/example/openApiIntegration/numbersapi_com/RmNumber";

// fix
global.FormData = function FormData(){  };
global.Blob     = function     Blob(){  };

describe("RequestManager for numbersapi.com", function() {

  it("test Json request", function (done) {
    RmNumber.Test.getTestJson().then(
      (res) => {
        assert.isObject(res)
        done();
      }
    ).catch(err => {
      done(err);
    });
  });

  it("test Html request", function (done) {
    RmNumber.Test.getTestText().then(
      (res) => {
        assert.isString(res)
        done();
      },
    ).catch(err => {
      done(err);
    });
  });

});
