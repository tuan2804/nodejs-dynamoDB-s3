const express = require('express');
const { renderCarList, handleAddCar, handleDeleteCar } = require('../controller/carController');
const uploadS3 = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', renderCarList);
router.post('/add', uploadS3.single('image'), handleAddCar);
router.post('/delete', handleDeleteCar);

module.exports = router;
