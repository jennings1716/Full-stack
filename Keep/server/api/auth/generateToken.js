const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config');

function generateToken(id, done) {
   console.log("id",id)
   jwt.sign({_id:id},jwtSecret,{ expiresIn: '30m' },done);
}

module.exports = generateToken;
