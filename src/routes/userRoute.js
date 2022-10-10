const express = require('express');

const upload = require('../middlewares/upload');
const userController = require('../controllers/userController');
const novelController = require('../controllers/novelController');

const router = express.Router();

router.patch(
  '/',
  upload.fields([{ name: 'profileUrl', maxCount: 1 }]),
  userController.updateUser
);

router.get('/:id/novels', novelController.getNovels);

module.exports = router;
