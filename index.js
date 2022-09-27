const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./src/models')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = process.env.APP_PORT

// Configuring CORS
app.use(cors())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Express JSON
app.use(express.json())

const Role = db.role
const User = db.user

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.info(`Drop and re-sync db`)
    initial()
  })
  .catch((err) => {
    console.error(`Failed to sync DB : ${err.message}`)
  })

const initial = () => {
  Role.create({
    id: 1,
    name: 'admin',
  })

  Role.create({
    id: 2,
    name: 'surveyor',
  })

  Role.create({
    id: 3,
    name: 'user',
  })

  User.create({
    email: 'surveyor@testing.com',
    name: 'Surveyor 1',
    phone_num: '628123918231',
    password: bcrypt.hashSync('qwe123@@', 10),
  }).then((user) => user.setRoles([2]))
}

app.get('/', (req, res) => {
  res.send('Hello Mo-Vus')
})

require('./src/routes/auth.route')(app)
require('./src/routes/user.route')(app)
require('./src/routes/customer.route')(app)
require('./src/routes/survey.route')(app)
require('./src/routes/question.route')(app)

app.listen(PORT, () => console.log(`Running on PORT : ${PORT}`))
