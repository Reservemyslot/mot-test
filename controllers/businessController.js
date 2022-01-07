const Business = require('../models/businessModel')
const User = require('../models/userModel');
const Service = require('../models/serviceModel');
const Employee = require('../models/employeeModel');

module.exports = {
  getEmployees: async (req, res) => {
    try {
      const businessId = req.params.businessId
      const business = await Business.findOne({ _id: businessId })

      if (!business)
        return res.status(403).json({ msg: 'business unavailable' })

      if (business.employees.length == 0)
        res.status(403).json({ msg: 'No Employees' })

      await business.populate('employees')

      res
        .status(200)
        .json({ message: 'All Employee details', data: business.employees })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  addEmployee: async (req, res) => {
    try {
      const {
        title,
        employeeName,
        position,
        bookingInterval,
        email,
        phone,
        weekOff,
        serviceId,
        workHours,
      } = req.body

      const businessId = req.params.businessId

      if (!businessId)
        return res.status(403).send('Business Id  is required in params')

      const isBusiness = await Business.findOne({ _id: businessId })
      if (!isBusiness) return res.status(403).send('Business Unavailable')

      const employee = new Employee({
        title,
        employeeName,
        position,
        bookingInterval,
        email,
        phone,
      })

      if (weekOff) employee.weekOff = weekOff
      if (serviceId) employee.serviceId = serviceId
      if (workHours) employee.workHours = workHours

      await employee.save()

      isBusiness.employees.push(employee._id)
      await isBusiness.save()

      res.status(200).json({
        msg: 'Success employee added',
        data: employee,
        business: isBusiness,
      })
    } catch (err) {
      res.status(403).json({ error: err })
    }
  },

  editEmployee: async (req, res) => {
    try {
      const {
        title,
        employeeName,
        position,
        bookingInterval,
        email,
        phone,
        weekOff,
        serviceId,
        workHours,
      } = req.body

      const employeeId = req.params.employeeId

      if (!employeeId)
        return res.status(403).send('Employee Id is required in params')

      let employee = await Employee.findOne({
        _id: employeeId,
      })

      if (!employee) return res.status(403).send('Employee unavailable')

      if (title) employee.title = title
      if (employeeName) employee.employeeName = employeeName
      if (bookingInterval) employee.bookingInterval = bookingInterval
      if (position) employee.position = position
      if (email) employee.email = email
      if (phone) employee.phone = phone
      if (weekOff) employee.weekOff = weekOff
      if (serviceId) employee.serviceId = serviceId
      if (workHours) employee.workHours = workHours

      employee.save()

      return res.status(200).json({
        message: 'EMPLOYEE UPDATED SUCCESSFULLY',
        data: employee,
      })
    } catch (err) {
      res.status(403).json({ error: err })
    }
  },

  editEmployeeStatus: async (req, res) => {
    try {
      const {
       status
      } = req.body

      const employeeId = req.params.employeeId

      if (!employeeId)
        return res.status(403).send('Employee Id is required in params')

      let employee = await Employee.findOne({
        _id: employeeId,
      })

      if (!employee) return res.status(403).send('Employee unavailable')

      if (status) employee.status = status

      employee.save()

      return res.status(200).json({
        message: 'EMPLOYEE STATUS UPDATED SUCCESSFULLY',
        data: employee,
      })
    } catch (err) {
      res.status(403).json({ error: err })
    }
  },

  deleteEmployee: async (req,res) => {
       try {
         const businessId = req.params.businessId
         const employeeId = req.params.employeeId
         if (!businessId)
           return res.status(403).send('Business Id is required in params')
         if (!employeeId)
           return res.status(403).send('Employee Id is required in params')
         
         let business = await Business.findOne({
              _id: businessId,
            })

        if (!business) return res.status(403).send('Business unavailable')

         let employee = await Employee.deleteOne({
           _id: employeeId,
         })

         if (!employee) return res.status(403).send('Employee unavailable')

         business.employees.pull(employeeId);



         business.save()

         return res.status(200).json({
           message: 'EMPLOYEE DELETED SUCCESSFULLY',
           data: employee,
         })
       } catch (err) {
         res.status(403).json({ error: err })
       }
  },
  
  deleteService: async (req,res) => {
      try {
        const businessId = req.params.businessId
        const serviceId = req.params.serviceId
        if (!businessId)
          return res.status(403).send('Business Id is required in params')
        if (!serviceId)
          return res.status(403).send('Service Id is required in params')

        let business = await Business.findOne({
          _id: businessId,
        })

        if (!business) return res.status(403).send('Business unavailable')

        let service = await Service.deleteOne({
          _id: serviceId,
        })

        if (!service) return res.status(403).send('Service unavailable')

        business.services.pull(serviceId)

        business.save()

        return res.status(200).json({
          message: 'SERVICE DELETED SUCCESSFULLY',
          data: service,
        })
      } catch (err) {
        res.status(403).json({ error: err })
      }
  },

  getBusiness: async (req, res) => {
    try {
      const businessId = req.params.businessId
      const business = await Business.findOne({ _id: businessId })

      if (!business)
        return res.status(403).json({ msg: 'business unavailable' })

      if (business.services.length > 0) await business.populate('services')
      if (business.employees.length > 0) await business.populate('employees')

      res.status(200).json({ message: 'All business details', data: business })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  getServiceNames: async (req, res) => {
    try {
      const businessId = req.params.businessId
      const business = await Business.findOne({ _id: businessId })

      if (!business)
        return res.status(403).json({ msg: 'business unavailable' })

      if (business.services.length == 0)
        res.status(403).json({ msg: 'No service Names' })

      await business.populate('services', 'serviceName')

      res
        .status(200)
        .json({ message: 'All business details', data: business.services })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  getServices: async (req, res) => {
    try {
      const businessId = req.params.businessId
      const business = await Business.findOne({ _id: businessId })

      if (!business)
        return res.status(403).json({ msg: 'business unavailable' })

      if (business.services.length == 0)
        res.status(403).json({ msg: 'No service Names' })

      await business.populate('services')

      res
        .status(200)
        .json({ message: 'All business details', data: business.services })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  addService: async (req, res) => {
    try {
      const {
        serviceName,
        description,
        timeDuration,
        breakDuration,
        price,
        currency,
        discount,
        cancellation,
        booking,
      } = req.body

      const businessId = req.params.businessId

      if (!businessId)
        return res.status(403).send('Business Id  is required in params')
      const isBusiness = await Business.findOne({ _id: businessId })
      if (!isBusiness) return res.status(403).send('Business Unavailable')

      const service = new Service({
        serviceName,
        description,
        timeDuration,
        breakDuration,
        price,
        currency,
        discount,
      })

      if (booking) service.booking = booking

      if (cancellation) service.cancellation = cancellation
      await service.save()

      isBusiness.services.push(service._id)
      await isBusiness.save()

      res.status(200).json({
        msg: 'Success service added',
        data: service,
        business: isBusiness,
      })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  editService: async (req, res) => {
    try {
      const {
        serviceName,
        description,
        timeDuration,
        breakDuration,
        price,
        currency,
        discount,
        cancellation,
        booking,
      } = req.body

      const serviceId = req.params.serviceId

      if (!serviceId)
        return res.status(403).send('Service Id is required in params')
      let service = await Service.findOne({
        serviceId,
      })

      console.log(service)

      if (!service) return res.status(403).send('Service unavailable')

      if (serviceName) service.serviceName = serviceName
      if (description) service.description = description
      if (timeDuration) service.timeDuration = timeDuration
      if (breakDuration) service.breakDuration = breakDuration
      if (price) service.price = price
      if (currency) service.currency = currency
      if (discount) service.discount = discount
      if (booking) service.booking = booking
      if (cancellation) service.cancellation = cancellation

      service.save()

      return res.status(200).json({
        message: 'SERVICE UPDATED SUCCESSFULLY',
        data: service,
      })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  addBusinessHours: async (req, res) => {
    try {
      const { businessHours } = req.body
      const userId = req.params.userId

      if (!userId) return res.status(403).send('User Id is required in params')
      const isUser = await User.findOne({ _id: userId })
      if (!isUser) return res.status(403).send('User Unavailable')

      const business = new Business({
        businessHours,
      })
      await business.save()

      isUser.businessId = business._id
      await isUser.save()

      res.status(200).json({
        msg: 'Success businessHours added',
        data: business,
        user: isUser,
      })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },

  editBusinessHours: async (req, res) => {
    try {
      const { businessHours } = req.body
      const businessId = req.params.businessId
      console.log(businessId, businessHours)
      if (!businessId)
        return res.status(403).send('Business Id is required in params')
      let newBussinessHr = await Business.findOne({
        businessId,
      })
      console.log(newBussinessHr)
      if (!newBussinessHr) return res.status(403).send('Business unavailable')

      let newBusiness = await Business.findOneAndUpdate(
        {
          businessId,
        },
        {
          $set: { businessHours },
        },
        {
          new: true,
        }
      )

      newBusiness.save()

      return res.status(200).json({
        message: 'BUSINESS HOURS UPDATED SUCCESSFULLY',
        data: newBusiness,
      })
    } catch (e) {
      res.status(403).json({ error: e })
    }
  },
}
