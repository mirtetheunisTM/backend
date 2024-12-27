const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Orders');
});

router.post('/', (req, res) => {
    res.send('Create Orders');
});

router.get('/:id', (req, res) => {
    res.send(`Orders ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Update Orders ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete Orders ${req.params.id}`);
});

module.exports = router;