const fs = require('fs');
const { User } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.updateUser = async (req, res, next) => {
  try {
    const { password, ...updateValue } = req.body;

    if (req.files.profileUrl) {
      const profileUrl = req.user.profileUrl;
      const secureUrl = await cloudinary.upload(
        req.files.profileUrl[0].path,
        profileUrl ? cloudinary.getPublicId(profileUrl) : undefined
      );

      updateValue.profileUrl = secureUrl;
      fs.unlinkSync(req.files.profileUrl[0].path);
    }

    await User.update(updateValue, { where: { id: req.user.id } });

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: 'password' }
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
