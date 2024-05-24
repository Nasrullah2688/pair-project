const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controllerUserProfile');


router.get('/homeBio', UserController.renderHomeBio);

// Route untuk render form create user profile
router.get('/userprofiles/create', UserController.renderCreateForm);

// Route untuk handle create user profile
router.post('/userprofiles/create', UserController.createUserProfile);

// Route untuk render form edit user profile
router.get('/userprofiles/:id/edit', UserController.renderEditForm);

// Route untuk handle edit user profile
router.post('/userprofiles/:id/edit', UserController.editUserProfile);

module.exports = router;
