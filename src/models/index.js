const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model')(sequelize, Sequelize)
db.role = require('./role.model')(sequelize, Sequelize)
db.customer = require('./customers.model.js')(sequelize, Sequelize)
db.customer_document = require('./customer_document.model')(
  sequelize,
  Sequelize
)

db.survey = require('./survey.model')(sequelize, Sequelize)
db.survey_document = require('./survey_document.model')(sequelize, Sequelize)

db.assesment_question = require('./assesment_question.model')(
  sequelize,
  Sequelize
)

db.surveys_questions = require('./surveys_questions.model')(
  sequelize,
  Sequelize
)

db.survey.belongsToMany(db.assesment_question, {
  through: db.surveys_questions,
  as: 'questions',
})

db.assesment_question.belongsToMany(db.survey, {
  through: db.surveys_questions,
  as: 'surveys',
})

db.customer_surveys = db.customer.hasMany(db.survey, {
  foreignKey: 'customer_id',
  as: 'customers_survey',
})

db.survey.belongsTo(db.customer, { foreignKey: 'customer_id' })

db.files = db.customer.hasMany(db.customer_document, {
  foreignKey: 'customer_id',
  as: 'files',
})

// Relation One Role has many Users
db.role.belongsToMany(db.user, {
  through: 'users_roles',
  foreignKey: 'role_id',
  otherKey: 'user_id',
})

// Relation One User has many Roles
db.user.belongsToMany(db.role, {
  through: 'users_roles',
  foreignKey: 'user_id',
  otherKey: 'role_id',
})

db.ROLES = ['user', 'admin', 'surveyor']

module.exports = db
