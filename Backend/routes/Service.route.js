
const { 
  createServices, 
  getAllServices, 
  getServiceById, 
  updateServices, 
  deleteServices 
} = require('../controller/Service.Controller');

const router = require('express').Router();

router.post('/createService', createServices);
router.post('/create', createServices);
router.get('/get', getAllServices);
router.get('/getAll', getAllServices);
router.get('/get/:id', getServiceById);
router.put('/update/:id', updateServices);
router.delete('/delete/:id', deleteServices);

module.exports = router;