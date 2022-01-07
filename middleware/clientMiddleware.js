

const client = async (req, res, next) => {
  try {
    return next()
  } catch (err) {
    throw err
  }
}

module.exports = {
  client,
}
