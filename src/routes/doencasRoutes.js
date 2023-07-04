const express = require('express');
const router = express.Router();
const controller = require('../controller/doencasController');

router.get('/', controller.findAll);

router.get('/:nome', controller.findByName);

router.get('/id/:id', controller.findByPk);

router.post('/', controller.create);

router.put('/:id', controller.alter);

router.delete('/:id', controller.remove);

module.exports = router;