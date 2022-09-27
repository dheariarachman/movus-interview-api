module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customers', {
    name: {
      type: Sequelize.STRING,
    },
    phone_num: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.STRING,
    },
    long: {
      type: Sequelize.STRING,
    },
  })

  return Customer
}
