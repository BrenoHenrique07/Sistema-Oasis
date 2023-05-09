const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('deu certo');
});

router.get('/:id', (req, res) => {

});

router.post('/', () => {

});

router.put('/:id', () => {

});

router.delete('/:id', () => {

});

module.exports = router;