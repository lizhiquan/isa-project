const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

function initJwt(credentialsRequired) {
  return jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'auth',
    credentialsRequired: credentialsRequired,
    getToken: getTokenFromHeader,
  });
}

const auth = {
  required: initJwt(true),
  optional: initJwt(false),
};

module.exports = auth;
