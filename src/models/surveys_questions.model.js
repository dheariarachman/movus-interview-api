module.exports = (sequelize, Sequelize) => {
  const SurveysQuestions = sequelize.define(
    'surveys_questions',
    {},
    { timestamps: false }
  )

  return SurveysQuestions
}
