const express = require('express');
const router = express.Router();
const controller = require('../controller/historicoController');

router.get('/:id', controller.findById);

router.post('/', controller.create);

router.delete('/:id', controller.remove);

module.exports = router;