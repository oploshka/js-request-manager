
const assert = require('chai').assert
import RmReqres from "js-request-manager/example/openApiIntegration/reqres_in/RmReqres";

// fix
global.FormData = function FormData(){  };
global.Blob     = function     Blob(){  };

describe("RequestManager for reqres.in", function() {

  it("test Json request", function (done) {
    RmReqres.Test.getTestJson().then(
      (res) => {
        console.log(res);
        assert.isObject(res)
        done();
      }
    ).catch(err => {
      done(err);
    });
  });


  it("RmReqres.User.getList", function (done) {
    RmReqres.User.getList({page: 1}).then(
      (res) => {
        assert.isObject(res)
        assert.isNumber(res.page)
        assert.isArray(res.data)
        done();
      }
    ).catch(err => {
      done(err);
    });
  });

  it("RmReqres.User.getById", function (done) {
    RmReqres.User.getById({userId: 1}).then(
      (user) => {
        assert.isObject(user)
        assert.isNumber(user.id)
        assert.isString(user.email) // first_name, last_name, avatar
        done();
      }
    ).catch(err => {
      done(err);
    });
  });

  it("RmReqres.User.create", function (done) {
    RmReqres.User.create({name: "tester", job: "job"}).then(
      (user) => {
        assert.isObject(user)
        assert.isNumber(parseInt(user.id)) // temp api fix
        done();
      }
    ).catch(err => {
      done(err);
    });
  });

  it("RmReqres.User.update", function (done) {
    RmReqres.User.update({userId: 1, user: { name: "tester", job: "job" } }).then(
      (user) => {
        assert.isObject(user)
        assert.isString(user.updatedAt) // temp api fix
        done();
      }
    ).catch(err => {
      done(err);
    });
  });

  it("RmReqres.User.delete", function (done) {
    RmReqres.User.delete({userId: 1}).then(
      (res) => {
        assert.isObject(res) // 204 status - empty object
        done();
      }
    ).catch(err => {
      done(err);
    });
  });

});
