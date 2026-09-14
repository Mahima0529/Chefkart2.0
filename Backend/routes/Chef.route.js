const { createChef, getAllChef, getById, updateChef, deleteChefById, DeleteAllChef } = require('../controller/Chefs.Controller');

const router = require('express').Router();

router.post('/create', createChef);
router.get('/get', getAllChef);
router.get('/getAll', getAllChef);
router.get('/get/:id', getById);
router.put('/update/:id', updateChef);
router.delete('/delete/:id', deleteChefById);

module.exports = router;