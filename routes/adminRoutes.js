const express = require('express');
const ControllerAdmin = require('../controllers/controllerAdmin');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/admin/tickets', authMiddleware, ControllerAdmin.adminHome); // Protected route
router.get('/admin/tickets/add', authMiddleware, ControllerAdmin.addTicketForm); // Protected route
router.post('/admin/tickets/add', authMiddleware, ControllerAdmin.addTicket); // Protected route
router.get('/admin/tickets/:id/edit', authMiddleware, ControllerAdmin.editTicketForm); // Protected route
router.post('/admin/tickets/:id/edit', authMiddleware, ControllerAdmin.editTicket); // Protected route
router.post('/admin/tickets/:id/delete', authMiddleware, ControllerAdmin.deleteTicket); // Protected route
router.get('/login', ControllerAdmin.loginPage);
router.get('/signup', ControllerAdmin.signupPage);
router.post('/validateAccount', ControllerAdmin.validateAccount);

module.exports = router;
