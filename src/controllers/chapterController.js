const AppError = require('../utils/appError');
const { Chapter, Novel } = require('../models');

exports.createChapter = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const novelId = +req.params.novelId;
    const { title, content } = req.body;
    console.log('first');

    if (!title) {
      throw new AppError('title is required', 400);
    }
    if (!content) {
      throw new AppError('content is required', 400);
    }
    const currentNovel = await Novel.findOne({
      where: { id: novelId }
    });

    if (!currentNovel) {
      throw new AppError('This Novel id is not found', 400);
    }
    const createChapter = await Chapter.create({
      title,
      content,
      novelId,
      userId
    });

    const createdChapter = await Chapter.findOne({
      where: { id: createChapter.id },
      include: { model: Novel }
    });

    res.status(201).json({ createdChapter });
  } catch (err) {
    next(err);
  }
};

exports.getChapters = async (req, res, next) => {
  try {
    const novelId = +req.params.novelId;
    console.log('novelId', novelId);
    console.log('req22', req);
    const chapters = await Chapter.findAll({
      where: { novelId }
    });
    res.status(200).json({ chapters });
  } catch (err) {
    next(err);
  }
};

exports.updateChapter = async (req, res, next) => {
  try {
    const chapterId = +req.params.chapterId;
    const { title, content } = req.body;
    if (!title || !title.trim()) {
      throw new AppError('title is required', 400);
    }

    if (!content || !content.trim()) {
      throw new AppError('content is required', 400);
    }

    const data = {};
    if (title) {
      data.title = title;
    }
    if (content) {
      data.content = content;
    }

    const checkChapter = await Chapter.findOne({
      where: {
        id: chapterId
      }
    });

    if (!checkChapter) {
      throw new AppError('This Chapter id is not found');
    }

    const chapter = await Chapter.update(data, { where: { id: chapterId } });
    res.status(200).json({ chapter });
  } catch (err) {
    next(err);
  }
};

exports.getEditChapter = async (req, res, next) => {
  try {
    const chapterId = +req.params.chapterId;
    const chapter = await Chapter.findOne({
      where: { id: chapterId }
    });
    if (!chapter) {
      throw new AppError('Chapter not found', 400);
    }
    res.status(200).json({ chapter });
  } catch (err) {
    next(err);
  }
};

exports.deleteChapter = async (req, res, next) => {
  try {
    const chapterId = +req.params.chapterId;
    const checkChapter = await Chapter.findOne({ where: { id: chapterId } });
    if (!checkChapter) {
      throw new AppError('Chapter not found', 400);
    }
    if (checkChapter.userId !== req.user.id) {
      throw new AppError('Not auth', 400);
    }
    await Chapter.destroy({ where: { id: chapterId } });
    const afterDelete = await Chapter.findAll({
      where: { userId: req.user.id }
    });
    res.status(200).json(afterDelete);
  } catch (err) {
    next(err);
  }
};
