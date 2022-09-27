const authJwt = require('./auth.middleware')
const verify = require('./signup.middleware')

module.exports = {
  authJwt,
  verify,
}
