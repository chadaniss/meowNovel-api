const express = require('express');

const upload = require('../middlewares/upload');
const userController = require('../controllers/userController');

const router = express.Router();

router.patch(
  '/',
  upload.fields([{ name: 'profileUrl', maxCount: 1 }]),
  userController.updateUser
);

module.exports = router;
