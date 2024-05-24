
const express = require('express');
const ControllerUser = require('../controllers/controllerUser');
const authMiddleware = require('../middleware/auth');
const ControllerAdmin = require('../controllers/controllerAdmin');
const router = express.Router();

// router.get('/userprofiles/:id', ControllerUser.showUserProfile);

// Rute lainnya
router.get('/',authMiddleware, ControllerUser.home);
router.get('/tickets/:id',authMiddleware, ControllerUser.detailTicket);
router.post('/tickets/:id/take',authMiddleware, ControllerUser.takeTicket);
router.get('/transactions',authMiddleware, ControllerUser.allTransactions);
router.get('/transaksi/beli-invoice',authMiddleware, ControllerUser.beliDanBuatInvoice);
router.get('/logout', ControllerAdmin.logout);

module.exports = router;