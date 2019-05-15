const should = require('chai').should();
const request = require('supertest');
const app = require('../app')();
const config = require('./test.config');
const notesModel = require('../models/notes.model');
const userModel = require('../models/user.model');
let USER_ID_1 = '';
let USER_ID_2 = '';
let noteID = 1;
const mongoose = require("mongoose");


// before((done) => {
//   notesModel.remove({}, (err) => {
//     if(err) return done(err);
//     done();
//   });
// });

before((done)=>{
  mongoose.connect("mongodb://localhost:27017/test_user",(err)=>{
    if(!err){
        console.log("Connection succeeded");
        done();
    }else{
        console.log("Error in connection",JSON.stringify(err,undefined,2))
    }
  });
})

function loginUser()
{
  return function(done)
  {
    this.timeout(4000);
      request(app)
        .post('/auth/v1/register')
        .send(config.users.user1)
        .end(function(err, res) {
          request(app)
          .post('/auth/v1/register')
          .send(config.users.user2)
          .end(function(err, res) {
                  request(app)
                    .post('/auth/v1/login')
                    .expect(201)
                    .send(config.users.user1)
                    .end((err, res) => {
                      should.not.exist(err);
                      json_res = JSON.parse(res.text)
                      USER_ID_1 = json_res.userid;
                      jwtToken1  = json_res.token;
                      request(app)
                      .post('/auth/v1/login')
                      .expect(201)
                      .send(config.users.user2)
                      .end((err, res) => {
                        json_res = JSON.parse(res.text)
                        should.not.exist(err);
                        jwtToken2  =json_res.token;
                        USER_ID_2 = json_res.userid;
                        done();
                        });
                      });
            })
        })
  
  };
};

before(loginUser());

//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
    const note = config.mockNotes.noteOne;
    note.userId = USER_ID_1
    request(app)
      .post(`/api/v1/notes/`)
      .set('Authorization', 'Bearer ' + jwtToken1)
      .send(note)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        should.equal(response.body.message, "saved the note",'Response should return note');
        // console.log("response.body.message",response.body.message);
        done();
        });
    });

  //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    // Should get added note of user 2 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    const note = config.mockNotes.noteTwo;
    note.userId = USER_ID_2
     request(app)
      .post(`/api/v1/notes/`)
      .set('Authorization', 'Bearer ' + jwtToken2)
      .send(note)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        should.equal(response.body.message, "saved the note",'Response should return note');
        done();
        });
  });
});

//  testsuite
describe('Testing to get all notes', function()
{
  //  testcase
  it('Should handle a request to get all notes of a user 1', function(done)
  {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 1
    const note = config.mockNotes.noteOne;
    request(app)
      .get(`/api/v1/notes/${USER_ID_1}`)
      .set('Authorization', 'Bearer ' + jwtToken1)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        should.equal(notes[notes.length-1].text, note.text,'Response should return list of notes');
        done();
      });
  });

  //  testcase
  it('Should handle a request to get all notes of a user 2', function(done)
  {
    // Should get all note as a array those are created by user 2 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 2
    const note = config.mockNotes.noteTwo;
    request(app)
      .get(`/api/v1/notes/${USER_ID_2}`)
      .set('Authorization', 'Bearer ' + jwtToken2)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        let notes = response.body;
        should.equal(notes[notes.length-1].text, note.text,'Response should return list of notes');
        done();
      });
  });
});

//  testsuite
describe('Testing to update a note', function()
{
  //  testcase
  it('Should handle a request to update a note by note id', function(done)
  {
    // Should return updated note and match updated note text value'
    // status = 200
    // response will hold updated note as an object
    let note = config.mockNotes.noteOne;
    note.text = "Updated Text";
    note.noteId = noteID;
    request(app)
        .put(`/api/v1/notes`)
        .set('Authorization', 'Bearer ' + jwtToken1)
        .expect(201)
        .send(note)
        .end((error, response) => {
          if(error) return done(error);
          let parsed_response = response.body.note;
          should.equal(parsed_response.text, note.text, 'Response should contain updated note');
          done();
        });
  });
});
