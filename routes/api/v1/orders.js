const express = require('express');
const router = express.Router();
const ordersController = require('../../../controllers/api/v1/orders');
const passport = require('../../../passport/passport');

router.get('/', passport.authenticate('jwt', { session: false }), ordersController.getAll);

router.post('/', ordersController.create);

router.get('/:id', passport.authenticate('jwt', { session: false }), ordersController.getOne);

router.put('/:id', passport.authenticate('jwt', { session: false }), ordersController.update);

router.delete('/:id', passport.authenticate('jwt', { session: false }), ordersController.destroy);

module.exports = router;