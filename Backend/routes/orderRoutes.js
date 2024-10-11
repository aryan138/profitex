const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const {verifyJwt} = require('../middlewares/authorize');

router.post('/placeorder',verifyJwt, orderController.placeorder);
router.get('/getorder',verifyJwt, orderController.getOrder);
router.get('/getorderbyid/:id', orderController.getOrderById);
router.put('/updateorder/:id', orderController.updateorder);
router.delete('/deleteorder/:id', orderController.deleteorder);
router.delete('/clear', orderController.clearOrders);

router.get('/accept/:id/:token', orderController.acceptOrder);
router.get('/reject/:id/:token', orderController.rejectOrder);

module.exports = router;

