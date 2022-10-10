const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');
const { Novel, User, Review } = require('../models');
const novelService = require('../services/novelService');

exports.createNovel = async (req, res, next) => {
  try {
    const { title, genre, synopsis } = req.body;

    if (!title || !title.trim()) {
      throw new AppError('title is required', 400);
    }
    if (!genre || !genre.trim()) {
      throw new AppError('genre is required', 400);
    }
    if (!synopsis || !synopsis.trim()) {
      throw new AppError('synopsis is required', 400);
    }
    if (!req.file) {
      throw new AppError('bookCoverUrl is required', 400);
    }

    const data = { userId: req.user.id };
    if (title) {
      data.title = title;
    }
    if (genre) {
      data.genre = genre;
    }
    if (synopsis) {
      data.synopsis = synopsis;
    }
    if (req.file) {
      data.bookCoverUrl = await cloudinary.upload(req.file.path);
      // console.log(req.file);
    }

    const newNovel = await Novel.create(data);
    const novel = await Novel.findOne({
      where: { id: newNovel.id },
      attributes: {
        exclude: 'userId'
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: 'password'
          }
        },
        {
          model: Review
        }
      ]
    });

    res.status(200).json({ novel });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getNovels = async (req, res, next) => {
  try {
    const { find } = req.query;
    const id = +req.params.id;
    const novels = await novelService.findNovels(id, find);
    res.status(200).json({ novels });
  } catch (err) {
    next(err);
  }
};

exports.getMyNovels = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const novels = await novelService.findUserNovels(id);
    res.status(200).json({ novels });
  } catch (err) {
    next(err);
  }
};

exports.updateNovel = async (req, res, next) => {
  try {
    const novelId = +req.params.novelId;
    const { title, synopsis } = req.body;
    console.log('title', title);
    if (!title || !title.trim()) {
      throw new AppError('title is required', 400);
    }

    if (!synopsis || !synopsis.trim()) {
      throw new AppError('synopsis is required', 400);
    }

    const data = {};
    if (title) {
      data.title = title;
    }
    if (synopsis) {
      data.synopsis = synopsis;
    }

    const checkNovel = await Novel.findOne({
      where: {
        id: novelId
      }
    });

    if (!checkNovel) {
      throw new AppError('Novel not found', 400);
    }

    // res.json(checkNovel);
    const novel = await Novel.update(data, { where: { id: novelId } });
    res.status(200).json({ novel });
  } catch (err) {
    next(err);
  }
};

exports.getEditNovel = async (req, res, next) => {
  try {
    const novelId = +req.params.novelId;
    const novel = await Novel.findOne({ where: { id: novelId } });
    if (!novel) {
      throw new AppError('Novel not found', 400);
    }
    res.status(200).json({ novel });
  } catch (err) {
    next(err);
  }
};

exports.updateBookCover = async (req, res, next) => {
  try {
    const novelId = +req.params.novelId;
    const checknovel = await Novel.findOne({ where: { id: novelId } });
    if (!checknovel) {
      throw new AppError('Novel not found', 400);
    }

    if (!req.file) {
      throw new AppError('bookCoverUrl is required', 400);
    }

    const data = {};
    if (req.file) {
      data.bookCoverUrl = await cloudinary.upload(req.file.path);
    }

    await Novel.update(data, { where: { id: novelId } });
    const novel = await Novel.findOne({ where: { id: novelId } });

    res.status(200).json({ novel });
  } catch (err) {
    next(err);
  }
};

exports.deleteNovel = async (req, res, next) => {
  try {
    const novelId = +req.params.novelId;
    const checknovel = await Novel.findOne({ where: { id: novelId } });
    if (!checknovel) {
      throw new AppError('Novel not found', 400);
    }
    if (checknovel.userId !== req.user.id) {
      throw new AppError('Novel not found', 400);
    }
  } catch (err) {}
};
