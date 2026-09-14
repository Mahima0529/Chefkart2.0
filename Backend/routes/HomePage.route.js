const { createKitchen, getallHomeImage, getHomeById, updateHomePage, deletehomePage } = require('../controller/HomePage.Controller');

const router = require('express').Router();

router.post('/createHomePage', createKitchen);
router.post('/create', createKitchen);
router.get('/getAll', getallHomeImage);
router.get('/getall', getallHomeImage);
router.get('/get', getallHomeImage);
router.get('/get/:id', getHomeById);
router.put('/update/:id', updateHomePage);
router.delete('/delete/:id', deletehomePage);

module.exports = router;