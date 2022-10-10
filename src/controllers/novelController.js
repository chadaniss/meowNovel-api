const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');
const { Novel } = require('../models');

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

    const novel = await Novel.create(data);
    res.status(200).json({ novel });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
