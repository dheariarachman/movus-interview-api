const db = require('../models')

const Customer = db.customer
const Files = db.files

exports.createCustomer = (req, res, next) => {
  try {
    Customer.create(
      {
        name: req.body.name,
        phone_num: req.body.phone_num,
        email: req.body.email,
        address: req.body.address,
        lat: req.body.lat,
        long: req.body.long,
        files: req.body.files ? req.body.files : [],
      },
      {
        include: [
          {
            association: Files,
            as: 'files',
          },
        ],
      }
    )
      .then((customer) => {
        res.status(201).send({
          message: `Customer created`,
          data: customer,
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

exports.allCustomers = async (req, res, next) => {
  try {
    const { page, page_size } = req.query
    const offset = page > 0 ? (page - 1) * page_size : page - 1

    if (page <= 0) {
      return res.status(500).send({
        message: `Page must be start from 1`,
      })
    }

    const customers = await Customer.findAndCountAll({
      offset: offset,
      limit: page_size,
    })
    res.status(200).send({
      message: `Get List Customers`,
      data: {
        page: +page,
        page_size: +page_size,
        pages_count: customers.count / page_size,
        ...customers,
      },
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    })
  }
}
