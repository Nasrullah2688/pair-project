const express = require('express');
const ControllerAdmin = require('../controllers/controllerAdmin');
const auth2Middleware = require('../middleware/auth2');
const router = express.Router();

router.get('/admin/tickets', auth2Middleware, ControllerAdmin.adminHome); // Protected route
router.get('/admin/tickets/add', auth2Middleware, ControllerAdmin.addTicketForm); // Protected route
router.post('/admin/tickets/add', auth2Middleware, ControllerAdmin.addTicket); // Protected route
router.get('/admin/tickets/:id/edit', auth2Middleware, ControllerAdmin.editTicketForm); // Protected route
router.post('/admin/tickets/:id/edit', auth2Middleware, ControllerAdmin.editTicket); // Protected route
router.post('/admin/tickets/:id/delete', auth2Middleware, ControllerAdmin.deleteTicket); // Protected route
router.get('/login', ControllerAdmin.loginPage);
router.get('/signup', ControllerAdmin.signupPage);
router.post('/validateAccount', ControllerAdmin.validateAccount);

module.exports = router;
