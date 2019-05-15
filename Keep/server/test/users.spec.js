const should = require('chai').should();
const request = require('supertest');
const app = require('../app')();
const config = require('./test.config');
const mongoose = require("mongoose");
const userModel = require('../models/user.model');

before((done) => {
   mongoose.connect("mongodb://localhost:27017/test_user",(err)=>{
    if(!err){
        console.log("Connection succeeded");
        done();
    }else{
        console.log("Error in connection",JSON.stringify(err,undefined,2))
    }
  });
});

// clear users collection
before((done) => {
  userModel.remove({}, (err) => {
    if(err) return done(err);
    done();
  });
});

const findUser = (query, done) => {
  userModel.findOne(query, (err, note)=> {
    if(err) {
      done(err);
    } else {
      done(null, note);
    }
  });
}
//  testsuite
describe('Testing to register a user', function()
{
  //  testcase
  it('Should handle a request to register a user', function(done)
  {
    request(app)
      .post('/auth/v1/register')
      .send(config.users.user1)
      .expect(200)
      .end((err, res) => {
      should.not.exist(err);
      should.exist(res.body, 'Response body should not be null or undefined');
      res.body.username.should.be.equal(config.users.user1.username, 'Response body should have a key as userInfo which will hold username value');
      findUser({username: res.body.username}, (error, user)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(user, 'Returning null as a response, should return registered user');
          user.username.should.be.equal(config.users.user1.username);
          done();
        }
    });
  });
});

  //  testcase
  it('Should handle a request to register a user multiple times with same username', function(done)
  {
    request(app)
        .post('/auth/v1/register')
        .send(config.users.user1)
        .expect(422)
        .end((error, response) => {
          if(error) return done(error);
          should.equal(response.body.message,'Duplication key error',"Should return duplication key error");
          done();
        });
});
  });


//  testsuite
describe('Testing to login user', function()
{
  //  testcase
  it('Should handle a request to successfully login', function(done)
  {
    //Response body should have a key as user which will hold userName as a key and it will hold username value
    // status code = 200
    // response body will hold user.userName
    request(app)
    .post('/auth/v1/login')
    .send(config.users.user1)
    .expect(201)
    .end((error, response) => {
      if(error) return done(error);
      should.exist(response.body.userid, 'Returning null as a response, should return registered user');
      done();
    });
  });

  //  testcase
  it('Should handle a request to login with wrong password', function(done)
  {
    request(app)
     .post('/auth/v1/login')
     .send(config.users.user1WithWrongPassword)
     .expect(403)
     .end((error, response) => {
       if(error) return done(error);
       should.equal(response.body.message, 'Unauthorized. Wrong password', 'response should return proper error message');
       //should.equal(response.body.message, 'You are not registered user', 'response should return proper error message');
       done();
     });
  });

  //  testcase
  it('Should handle a request to login with wrong username', function(done)
  {
    //Response body should have a key as message which will hold value as 'You are not registered user'
    // status code = 403
    // response body will hold an object with message key
    request(app)
    .post('/auth/v1/login')
    .send(config.users.user2)
    .expect(403)
    .end((error, response) => {
      if(error) return done(error);
      should.equal(response.body.message, 'Unauthorized', 'response should return proper error message');
      done();
    });
  });
});
