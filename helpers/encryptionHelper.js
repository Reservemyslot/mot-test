
const crypto = require('crypto')


module.exports = {

  generateRandomString: (length) =>
    crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length),
  
  hashString: (value, salt) =>
    crypto.createHmac('sha256', salt).update(value).digest('hex'),

  generateRandomNumber: (length) => {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    )
  }
}
