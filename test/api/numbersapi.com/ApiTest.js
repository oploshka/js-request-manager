
// const assert      = require('assert').strict;
const assert = require('chai').assert
import NumberRM from "../../../testSdk/numbersapi.com/NumberRM";

// fix
global.FormData = function FormData(){  };
global.Blob     = function     Blob(){  };

describe("RequestManager for numbersapi.com", function() {

  it("test Json request", function (done) {
    NumberRM.testJson().then(
      (res) => {
        assert.isObject(res)
        done();
      },
      // (err) => {
      //   // assert.strictEqual(err.code , 'NOT_VALID_RESPONSE');
      //   // assert.strictEqual(err.message , 'undefined Undefined error'); // TODO: fix
      //   done(err);
      // },
    ).catch(err => {
      done(err);
    });
  });

  it("test Html request", function (done) {
    NumberRM.testHtml().then(
      (res) => {
        assert.isBoolean(res)
        done();
      },
      // (err) => {
      //   // assert.strictEqual(err.code , 'NOT_VALID_RESPONSE');
      //   // assert.strictEqual(err.message , 'undefined Undefined error'); // TODO: fix
      //   done(err);
      // },
    ).catch(err => {
      done(err);
    });
  });

});
