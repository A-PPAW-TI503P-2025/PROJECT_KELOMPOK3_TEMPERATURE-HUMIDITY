const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/data', sensorController.saveSensorData);
router.get('/latest', sensorController.getLatestData);
router.get('/history', sensorController.getHistory);

module.exports = router;