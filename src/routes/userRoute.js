const express = require('express');

const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');
const userController = require('../controllers/userController');

const router = express.Router();

router.patch(
  '/',
  authenticate,
  upload.fields([{ name: 'profileUrl', maxCount: 1 }]),
  userController.updateUser
);

module.exports = router;
