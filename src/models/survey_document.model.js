module.exports = (sequelize, Sequelize) => {
  const SurveyDocument = sequelize.define('survey_documents', {
    survey_id: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    path: {
      type: Sequelize.STRING,
    },
  })

  return SurveyDocument
}
