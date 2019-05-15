const verifyToken = require('./verifyToken');

function authorize(authorizedScopes) {
  return function(req, res, next) {
    const authorizationHeader = req.get('Authorization');
    if(!authorizationHeader) { res.status(403).json({message: 'Unauthorized'}); return; }
    const token = authorizationHeader.replace('Bearer ', '');
    if(!token) { res.status(403).json({message: 'Unauthorized'}); return; }

    verifyToken(token, (err, claims) => {
      if(err) { res.status(403).json({message: 'Unauthorized'}); return; }
      next();
    });
  }
}

module.exports = authorize;
