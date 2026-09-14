const { createContact, getallContact, deleteContact } = require('../controller/Contact.controller');

const router = require('express').Router();

router.post('/', createContact);
router.post('/createContact', createContact);
router.post('/create', createContact);
router.get('/', getallContact);
router.get('/get', getallContact);
router.get('/getAll', getallContact);
router.delete('/delete/:id', deleteContact);

module.exports = router;