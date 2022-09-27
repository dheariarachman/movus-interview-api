const db = require('../models')

const AssesmentQuestion = db.assesment_question

exports.createAssesmentQuestion = (req, res, next) => {
  try {
    AssesmentQuestion.bulkCreate(req.body)
      .then((schedule) => {
        res.status(201).send({
          message: `Schedule created`,
          data: schedule,
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

exports.updateAssesmentQuestion = async (req, res, next) => {
  try {
    const question = await AssesmentQuestion.findOne({
      where: {
        id: req.params.id,
      },
    })

    if (!question) {
      return res.status(404).send({
        message: `Question not found`,
      })
    }

    const updatedQuestion = await AssesmentQuestion.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (!updatedQuestion) {
      return res.status(500).send({
        message: `Something went wrong`,
      })
    }

    res.status(204).send({
      message: `Updated Successfully`,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

exports.getAllAssesmentQuestion = async (req, res, next) => {
  try {
    const { page, page_size } = req.query
    const offset = page > 0 ? (page - 1) * page_size : page - 1

    if (page <= 0) {
      return res.status(500).send({
        message: `Page must be start from 1`,
      })
    }

    const questions = await AssesmentQuestion.findAndCountAll({
      offset: offset,
      limit: page_size,
      order: [['createdAt', 'DESC']],
    })

    res.status(200).send({
      message: `Get List Questions`,
      data: {
        page: +page,
        page_size: +page_size,
        pages_count: questions.count / page_size,
        ...questions,
      },
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    })
  }
}
