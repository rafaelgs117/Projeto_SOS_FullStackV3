const express = require('express');
const controller = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { registroSchema, loginSchema } = require('../middlewares/schemas');
const router = express.Router();
router.post('/registro', validate(registroSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
module.exports = router;
