const app = require('express').Router();
const path = require('path');
const {enableAuth} = require('../config');
const noteReq = require("../dao/notes.dao");
const labelReq = require("../dao/labels.dao");
const authorize = require('./auth/authorize');

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

require("../models/db")
const controller = require('./auth/auth.controller');

app.use(require('body-parser').json());
app.use('/auth/v1', require('./auth'));
//--------------------ALL Users-------------------------------------------------
app.get("/api/v1/allusers",authorize(),controller.getAllUsers);
//----------------------NOTES----------------------------------------------------
app.get('/api/v1/notes/:id', authorize(),noteReq.getNotes);
app.post('/api/v1/notes', authorize(),noteReq.postNotes);
app.put('/api/v1/notes/:id', authorize(),noteReq.putNotes);
app.put('/api/v1/updatenotes', authorize(),noteReq.updateMultipleNotes);
app.delete('/api/v1/notes',authorize(),noteReq.deleteNotes)
//----------------------LABELS----------------------------------------------------
app.get('/api/v1/labels/:id', authorize(),labelReq.getLabels);
app.post('/api/v1/labels', authorize(),labelReq.postLabels);
app.put('/api/v1/multilabels', authorize(),labelReq.putLabels);
app.delete('/api/v1/labels',authorize(),labelReq.deleteLabels);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((err, req, res, next) => {
  if(err) { next(); }
  console.log('err:', err);
});

module.exports = app;
