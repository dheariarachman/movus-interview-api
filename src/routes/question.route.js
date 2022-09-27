const { authJwt } = require('../middlewares')
const controller = require('../controllers/assesment.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get(
    '/api/questions',
    [authJwt.verifyToken, authJwt.isSurveyor],
    controller.getAllAssesmentQuestion
  )
  app.post(
    '/api/questions',
    [authJwt.verifyToken, authJwt.isSurveyor],
    controller.createAssesmentQuestion
  )

  app.put(
    `/api/questions/:id`,
    [authJwt.verifyToken, authJwt.isSurveyor],
    controller.updateAssesmentQuestion
  )
}
