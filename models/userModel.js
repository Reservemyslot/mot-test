// const { ObjectId } = require('mongodb')
// const { Schema, model, Types } = require('mongoose')
// const { models, enums } = require('../constants')

// const {
//   generateRandomString,
//   hashString,
// } = require('../helpers/encryptionHelper')  

// const schema = new Schema(
//   {
//     userId: {
//       type: String,
//       default: () => `${generateRandomString(6)}`,
//     },
//     name: { type: String, trim: true },
//     userName: { type: String, trim: true },
//     email: { type: String, trim: true, required: true, unique: true },
//     emailVerified: { type: Boolean, default: false },
//     businessEmail: { type: String, trim: true },
//     businessEmailVerified: { type: Boolean, default: false },
//     password: { type: String },
//     salt: { type: String },
//     loginAttempts: { type: Number, default: 0 },
//     lockUntil: { type: Number },
//     isDeleted: { type: Boolean, default: false },
//     verificationEmailToken: { type: String, default: '' },
//     forgotPasswordToken: { type: String, default: '' },
//     tokenExpiresIn: {
//       type: Number,
//       default: new Date().setMinutes(new Date().getMinutes() + 10),   
//     },
//     role: {
//       type: String,
//       enum: Object.values(enums.USER_ROLES),
//       default: enums.USER_ROLES.USER,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     phoneVerified: { type: Boolean, default: false },
//     appointmentNo: {
//       type: String,
//     },
//     businessId: { type: ObjectId, ref: models.BUSINESS },
//     businessName: { type: String, trim: true, required: true },
//     location: { type: String, trim: true, required: true },
//     businessCountry: { type: String, trim: true },
//     currency: { type: String, trim: true },
//     businessCity: { type: String, trim: true },
//     agentName: { type: String, trim: true },
//     website: { type: String, trim: true },
//     address: {
//       type: String,
//       default: '',
//     },
//     googleBusinessLink: { type: String, default: '' },
//     imageUrl: {
//       type: String,
//       default: 'https://robohash.org/24.218.243.24.png',
//     },
//     imageName: { type: String, default: 'defaultPic.png' },
//     isProfileCompleted: { type: Boolean, default: false },
//     __v: { type: Number, select: false },
//   },
//   { timestamps: true }
// )

// class User {
//   comparePassword(password) {
//     try {
//       const rePassword = hashString(password, this.salt)
//       return rePassword === this.password
//     } catch (e) {
//       return false
//     }
//   }

//   async setUserName(name) {
//     this.userName = `${name}${generateRandomString(3)}`
//     await this.save()
//   }

//   async setPassword(password) {
//     this.salt = generateRandomString(16)
//     this.password = hashString(password, this.salt)
//     await this.save()
//   }
// }

// schema.loadClass(User)
// module.exports = model(models.USER, schema)
