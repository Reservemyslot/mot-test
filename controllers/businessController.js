const Business = require('../models/businessModel')

module.exports = {
  getBusiness: (req, res) => {
   
          let field = req.query.field ? req.query.field : 'Trading_Name';
          console.log(field)
          try {
            Business.aggregate([
              {
                $search: {
                  autocomplete: {
                    query: `${req.query.term}`,
                    path: field,
                  },
                },
              },
              {
                $limit: 20,
              },
            ]).exec((error, data) => {
              if (error) {
                return res.status(400).json({
                  error: error.message,
                })
              }
              console.log(data.length)
              res.status(200).json({ data: data })
            })
          } catch (e) {
            res.status(500).send({ message: e.message })
          }
  },
}
