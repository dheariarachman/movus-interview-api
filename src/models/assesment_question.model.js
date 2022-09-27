module.exports = (sequelize, Sequelize) => {
  const AssesmentQuestion = sequelize.define('assesment_questions', {
    question: {
      type: Sequelize.STRING,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
  })

  return AssesmentQuestion
}
