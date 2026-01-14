const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/data', sensorController.saveSensorData);
router.get('/latest', sensorController.getLatestData);
router.get('/history', sensorController.getHistory);
router.delete('/clear', sensorController.clearLogs);

module.exports = router;