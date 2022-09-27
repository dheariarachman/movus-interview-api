const { authJwt } = require('../middlewares')
const controller = require('../controllers/survey.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get(
    '/api/surveys',
    [authJwt.verifyToken, authJwt.isSurveyor],
    controller.allSurvey
  )

  app.post(
    '/api/surveys',
    [authJwt.verifyToken, authJwt.isSurveyor],
    controller.createSurvey
  )

  app.post(
    `/api/survey/:id`,
    [authJwt.verifyToken, authJwt.isSurveyor],
    controller.assignQuestionToSurvey
  )
}
