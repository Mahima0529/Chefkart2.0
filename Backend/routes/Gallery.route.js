const { createGallery, getAllGallery, getGalleryById, updateGallery, deleteGallery } = require('../controller/Gallery.Controller');

const router = require('express').Router();

router.post('/createGallery', createGallery);
router.post('/create', createGallery);
router.get('/get', getAllGallery);
router.get('/getAll', getAllGallery);
router.get('/get/:id', getGalleryById);
router.put('/update/:id', updateGallery);
router.delete('/delete/:id', deleteGallery);
router.delete('/delete', deleteGallery);

module.exports = router;