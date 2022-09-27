exports.allAccess = (req, res) => {
  res.status(200).send('public content')
}

exports.userBoard = (req, res) => {
  res.status(200).send('User content')
}

exports.adminBoard = (req, res) => {
  res.status(200).send('admin content')
}

exports.surveryorBoard = (req, res) => {
  res.status(200).send('Surveyor content')
}
