module.exports = (sequelize, Sequelize) => {
  const Survey = sequelize.define('surveys', {
    address: {
      type: Sequelize.STRING,
    },
    amount_of_kids: {
      type: Sequelize.INTEGER,
    },
    marital_status: {
      type: Sequelize.STRING,
    },
    personal_income: {
      type: Sequelize.DECIMAL,
    },
  })

  return Survey
}
