const express = require('express');
const controller = require('../controllers/userController');
const authenticate = require('../middlewares/auth');
const router = express.Router();
router.get('/privado', authenticate, controller.privateRoute);
router.get('/me', authenticate, controller.me);
router.get('/usuarios', authenticate, controller.list);
module.exports = router;
