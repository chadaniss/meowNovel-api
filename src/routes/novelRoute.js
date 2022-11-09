const express = require('express');

const upload = require('../middlewares/upload');
const novelController = require('../controllers/novelController');

const router = express.Router();

router
  .route('/')
  .post(upload.single('bookCoverUrl'), novelController.createNovel);
module.exports = router;

router.get('/browse', novelController.getNovels);

router.put('/edit/:novelId', novelController.updateNovel);

router.get('/edit/:novelId', novelController.getEditNovel);

router.get('/mynovels', novelController.getMyNovels);

router.put(
  '/editimage/:novelId',
  upload.single('image'),
  novelController.updateBookCover
);

router.delete('/delete/:novelId', novelController.deleteNovel);

router.get('/current/:novelId', novelController.getCurrentNovel);
