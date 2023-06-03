const express = require('express');
const router = express.Router();
const controller = require('../controller/usuariosController');

router.post('/cadastrar', controller.create);

router.post('/login', controller.login);

module.exports = router;