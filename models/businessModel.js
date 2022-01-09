const { Schema, model} = require('mongoose')
const { models, enums } = require('../constants')



const schema = new Schema(
  {
    Site_Number: {
      type: String,
      required: [true, 'Site Number is Required'],
    },
    Trading_Name: {
      type: String,
      required: [true, 'Trading Name is Required'],
    },
    Address1: {
      type: String,
      required: [true, 'Trading Name is Required'],
    },
    Address2: {
      type: String,
    },
    Town: {
      type: String,
      required: [true, 'Town Name is Required'],
    },
    Postalcode: {
      type: String,
      required: [true, 'Postal code is Required'],
    },
    Phone: {
      type: String,
      required: [true, 'Phone number is Required'],
    },
    Class_1: {
      type: Number,
    },
    Class_2: {
      type: Number,
    },
    Class_3: {
      type: Number,
    },
    Class_4: {
      type: Number,
    },
    Class_5: {
      type: Number,
    },
    Class_6: {
      type: Number,
    },
    Class_7: {
      type: Number,
    },
  },
  { timestamps: true }
)


module.exports = model(models.BUSINESS, schema)
