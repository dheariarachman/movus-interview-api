const db = require('../models')

const Survey = db.survey

exports.createSurvey = (req, res, next) => {
  try {
    Survey.create({
      address: req.body.address,
      schedule: req.body.schedule,
      customer_id: req.body.customer_id,
      marital_status: req.body.marital_status,
      amount_of_kids: req.body.amount_of_kids,
      personal_income: req.body.personal_income,
    })
      .then((survey) => {
        res.status(201).send({
          message: `Survey Schedule created`,
          data: survey,
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        })
      })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

exports.assignQuestionToSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByPk(req.params.id, {
      include: [db.customer, { as: 'questions', model: db.assesment_question }],
    })

    if (survey) {
      await survey.setQuestions(req.body.questions, { save: false })
    }

    res.status(201).send({
      message: survey,
    })
  } catch (error) {
    res.status(500).send({
      message: error.message,
    })
  }
}

exports.allSurvey = async (req, res, next) => {
  try {
    const { page, page_size } = req.query
    const offset = page > 0 ? (page - 1) * page_size : page - 1

    if (page <= 0) {
      return res.status(500).send({
        message: `Page must be start from 1`,
      })
    }

    const schedules = await Survey.findAndCountAll({
      offset: offset,
      limit: page_size,
      include: [db.customer, { as: 'questions', model: db.assesment_question }],
    })
    res.status(200).send({
      message: `Get List Survey`,
      data: {
        page: +page,
        page_size: +page_size,
        pages_count: schedules.count >= 10 ? schedules.count / page_size : 1,
        ...schedules,
      },
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    })
  }
}
