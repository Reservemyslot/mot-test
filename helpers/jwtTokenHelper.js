const { sign, verify } = require('jsonwebtoken')
const { JWT_SECRET } = require('../serverConfig')

module.exports = {
  
  createJwt: async (payload) =>
    await sign(payload, JWT_SECRET, { expiresIn: '200h' }),

  decodeToken: async (token) =>
    await verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return false
      else if (decoded) return decoded
      else return false
    }),
}
