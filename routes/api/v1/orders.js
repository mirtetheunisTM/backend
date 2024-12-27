const express = require('express');
const router = express.Router();
const ordersController = require('../../../controllers/api/v1/orders');

router.get('/', ordersController.getAll);

router.post('/', ordersController.create);

router.get('/:id', ordersController.getOne);

router.put('/:id', ordersController.update);

router.delete('/:id', ordersController.destroy);

module.exports = router;