const express = require('express');

const chapterController = require('../controllers/chapterController');

const router = express.Router();

router.post('/create/:novelId', chapterController.createChapter);
router.get('/:novelId', chapterController.getChapters);
router.put('/edit/:chapterId', chapterController.updateChapter);
router.get('/edit/:chapterId', chapterController.getEditChapter);
router.get('/edit/:chapterId', chapterController.getEditChapter);
router.delete('/delete/:chapterId', chapterController.deleteChapter);

module.exports = router;
