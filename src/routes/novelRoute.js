const express = require('express');

const upload = require('../middlewares/upload');
const novelController = require('../controllers/novelController');

const router = express.Router();

router
  .route('/')
  .post(upload.single('bookCoverUrl'), novelController.createNovel);
module.exports = router;
