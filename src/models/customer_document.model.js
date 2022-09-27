module.exports = (sequelize, Sequelize) => {
  const CustomerDocument = sequelize.define('customer_documents', {
    type: {
      type: Sequelize.STRING,
    },
    path: {
      type: Sequelize.STRING,
    },
  })

  return CustomerDocument
}
