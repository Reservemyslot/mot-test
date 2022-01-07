const { Router } = require('express');
const {
  addBusinessHours,
  editBusinessHours,
  getServiceNames,
  getServices,
  addService,
  editService,
  getBusiness,
  addEmployee,
  getEmployees,
  editEmployee,
  editEmployeeStatus,
  deleteEmployee,
  deleteService
} = require('../../controllers/businessController')

const businessApi = new Router()

businessApi.get('/:businessId', getBusiness)

businessApi.post('/businessHours/add/:userId', addBusinessHours);

businessApi.put('/businessHours/edit/:businessId', editBusinessHours);

businessApi.get('/serviceName/list/:businessId', getServiceNames);

businessApi.get('/service/list/:businessId', getServices);

businessApi.post('/service/add/:businessId', addService);

businessApi.put('/service/edit/:serviceId', editService);

businessApi.delete('/services/delete/:businessId/:serviceId', deleteService);

businessApi.get('/employee/list/:businessId', getEmployees);

businessApi.post('/employee/add/:businessId', addEmployee);

businessApi.put('/employee/edit/:employeeId', editEmployee);

businessApi.put('/employee/status/:employeeId', editEmployeeStatus);

businessApi.delete('/employee/delete/:businessId/:employeeId', deleteEmployee);

module.exports = businessApi
