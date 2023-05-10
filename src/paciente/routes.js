const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.post('/', controller.createPacient);

router.put('/:id', controller.alterPacient);

router.delete('/:id', controller.deletePacient);

module.exports = router;