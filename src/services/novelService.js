const { QUERY_NOVEL_FIND_ALL } = require('../config/constants');
const { Novel, User, Review } = require('../models');

exports.findNovels = async (userId, find) => {
  const includeOption = [
    {
      model: User,
      attributes: {
        exclude: 'password'
      }
    },
    {
      model: Review
    }
  ];

  if (find === QUERY_NOVEL_FIND_ALL) {
    // SELECT * FROM NOVEL
    const novels = await Novel.findAll({
      attributes: {
        exclude: 'userId'
      },
      include: includeOption,
      order: [['updatedAt', 'DESC']]
    });
    return novels;
  }
  const novels = await Novel.findAll({
    where: { userId },
    attributes: {
      exclude: 'userId'
    },
    include: includeOption,
    order: [['updatedAt', 'DESC']]
  });
  return novels;
};
