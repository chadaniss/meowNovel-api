const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { User } = require('../models');

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '1d'
  });

exports.register = async (req, res, next) => {
  try {
    const { userName, email, firstName, lastName, password, confirmPassword } =
      req.body;

    if (!userName) {
      throw new AppError('userName is required', 400);
    }
    if (!email) {
      throw new AppError('email is required', 400);
    }
    if (!password) {
      throw new AppError('password is required', 400);
    }
    if (password !== confirmPassword) {
      throw new AppError('password and confirm password did not match', 400);
    }

    const isEmail = validator.isEmail(email + '');

    if (!isEmail) {
      throw new AppError('email is invalid format', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      userName,
      email,
      firstName,
      lastName,
      password: hashedPassword
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
