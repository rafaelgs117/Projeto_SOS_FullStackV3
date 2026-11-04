const express = require('express');
const controller = require('../controllers/healthController');
const router = express.Router();
router.get('/', controller.home);
router.get('/api/health', controller.health);
module.exports = router;
