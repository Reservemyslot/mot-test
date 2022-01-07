const User = require('../models/userModel');
const { createJwt } = require('../helpers/jwtTokenHelper.js');
const models = require('../constants/models');
const enums = require('../constants/enums');




module.exports = {

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('businessId').select(
        '-password  -createdAt -updatedAt -salt'
      )
      res.status(200).json({ message: 'ALL_USER', data: users })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  getUnVerifiedUsers: async (req, res) => {
    try {
      const users = await User.find({ emailVerified: { $eq: false } }).populate('businessId').select(
        '-password  -createdAt -updatedAt -salt'
      )
      res.status(200).json({ message: 'ALL_USER', data: users })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  register: async (req, res) => {
    try {
      var { name, email, phone, businessName, location } = req.body
      if (businessName.length > 32)
        return res.status(406).json({ msg: 'Business name max length is 32' })
      if (!phone === undefined || null) {
        const isPhone = await User.findOne({ phone: phone })
        if (isPhone)
          return res.status(402).json({ msg: 'Phone number already exists' })
      }
      email = email.toLowerCase()
      businessName = businessName.toLowerCase()
      const isUser = await User.findOne({ email })
      if (isUser) return res.status(403).send('Email already exits')
      const isBusinessName = await User.findOne({ businessName })
      if (isBusinessName)
        return res.status(401).json({ msg: 'Business name already exists' })
      const newUser = new User({
        name,
        email,
        businessName,
        phone,
        location,
      })

      if(req.params.userId){
         const isAdmin = await User.findOne({ _id: req.params.userId });
         if (!isAdmin || isAdmin.role !== 'ADMIN')
           return res.status(403).send('Admin Unavailable');

         newUser.emailVerified = true
      }
      await newUser.setUserName(name)
      await newUser.setPassword(name)
      await newUser.save()
      res
        .status(200)
        .json({ msg: `Success Your account is created with ${email}`, data:newUser })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  login: async (req, res) => {
    try {
      var { email } = req.body
      email = email.toLowerCase()
      const isUser = await User.findOne({
        email,
      })
      if (!isUser) return res.status(400).json({ msg: 'Email unavailable' })
      if (!isUser.emailVerified)
        return res
          .status(400)
          .json({ msg: 'Kidly verify your account,Account is not verified' })
      const maxLoginAttempts = 5
      if (
        isUser.loginAttempts >= maxLoginAttempts &&
        new Date().getTime() < isUser.lockUntil
      ) {
        return res.json({ message: 'TRY_AFTER_SOMETIME' })
      }
      const isMatch = await isUser.comparePassword(req.body.password)
      if (isMatch) {
        isUser.loginAttempts = 0
        await isUser.save()
        const payload = {
          user: {
            id: isUser.userId,
          },
        }
        const token = await createJwt(payload)

        isUser.password = undefined
        isUser.salt = undefined
        isUser.createdAt = undefined
        isUser.updatedAt = undefined
        return res
          .status(200)
          .json({ message: 'LOGIN_SUCCESS', data: { isUser, token } })
      }
      isUser.loginAttempts += 1
      await isUser.save()
      if (isUser.loginAttempts === maxLoginAttempts) {
        isUser.lockUntil = new Date().setMinutes(new Date().getMinutes() + 15)
        await isUser.save()
        return res.json({ message: 'USER LOCKED' })
      }
      return res.status(403).json({
        message: 'THE_EMAIL_AND/OR_PASSWORD_YOU_ENTERED_ARE_NOT_CORRECT.',
      })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  updateProfile: async (req, res) => {
    console.log(req.params.userId);
    try {
      const user = await User.findOne({ _id: req.params.userId })
      if (!user) return res.status(403).json({ message: 'USER_UNAVAILABLE' })
      let {
        name,
        businessName,
        email,
        phone,
        appointmentNo,
        agentName,
        businessCategory,
        businessCountry,
        businessCity,
        address,
        googleBusinessLink,
        currency,
        website,
        addToReserveWebsite,
      } = req.body
      
      if (businessName) user.businessName = businessName
      if (email) user.email = email
      if (phone) user.phone = phone
      if (appointmentNo) user.appointmentNo = appointmentNo
      if (agentName) user.agentName = agentName
      if (businessCategory) user.businessCategory = businessCategory
      if (businessCountry) user.businessCountry = businessCountry
      if (businessCity) user.businessCity = businessCity
      if (address) user.address = address
      if (googleBusinessLink) user.googleBusinessLink = googleBusinessLink
      if (currency) user.currency = currency
      if (website) user.website = website
      if (addToReserveWebsite) user.addToReserveWebsite =  addToReserveWebsite
      
      if (name) {
        user.name = name
        await user.setPassword(name);
      }

      await user.save()
      user.password = undefined
      user.createdAt = undefined
      user.updatedAt = undefined
      user.salt = undefined
 
      return res.status(200).json({ message: 'PROFILE UPDATED SUCCESSFULLY', data: user })
    } catch (e) {
       res.status(403).json({ error: e })
    }
  },

  removeUser : async (req,res) => {
     try {
       const adminId = req.params.adminId;
       const userId = req.params.userId;
      
       if(!adminId) res.status(403).json({ message: 'admin Id is required in params' })

       const admin = await User.findOne({_id:adminId});

       if(admin.role !== enums.USER_ROLES.ADMIN) res.status(403).json({ message: 'admin unavailable' })
        
       if(!admin) res.status(403).json({ message: 'admin unavailable' });

       const user = await User.deleteOne({_id:userId});

       return res
         .status(200)
         .json({ message: 'USER DELETED SUCCESSFULLY', data: user })


     } catch (e) {
       res.status(403).json({ error: e })
     }
  }
}
