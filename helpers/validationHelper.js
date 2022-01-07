
const { body, validationResult } = require('express-validator')


module.exports = {
  registerRules: () => [
    body('name', 'name is required').not().isEmpty(),
    body('email', 'Enter valid email').isEmail(),
    body('phone', 'phone number is required').not().isEmpty(),
    body('businessName', 'name is required').not().isEmpty(),
    body('location', 'location is required').not().isEmpty(),
  ],

  loginRules: () => [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password must be at least six characters long').isLength({
      min: 6,
    }),
  ],

  validate: (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
     next()
    }
    const extractedErrors = []
    errors.array().map((err) => {
      extractedErrors.push({
        [err.location]: err.location,
        params: err.param,
        msg: err.msg,
      })
    })
    return res.status(400).json({ errors: extractedErrors })
  },
}
