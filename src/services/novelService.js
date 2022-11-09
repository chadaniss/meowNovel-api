const {
  QUERY_NOVEL_FIND_ALL,
  QUERY_NOVEL_FIND_ACTION,
  QUERY_NOVEL_FIND_COMEDY,
  QUERY_NOVEL_FIND_DRAMA,
  QUERY_NOVEL_FIND_FANTASY,
  QUERY_NOVEL_FIND_ROMANCE,
  QUERY_NOVEL_FIND_THRILLER
} = require('../config/constants');
const { Novel, User, Review } = require('../models');

exports.findNovels = async (find) => {
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
  if (find === QUERY_NOVEL_FIND_ACTION) {
    const novels = await Novel.findAll({
      where: { genre: QUERY_NOVEL_FIND_ACTION },
      attributes: {
        exclude: 'userId'
      },
      include: includeOption,
      order: [['updatedAt', 'DESC']]
    });
    return novels;
  }
  if (find === QUERY_NOVEL_FIND_COMEDY) {
    const novels = await Novel.findAll({
      where: { genre: QUERY_NOVEL_FIND_COMEDY },
      attributes: {
        exclude: 'userId'
      },
      include: includeOption,
      order: [['updatedAt', 'DESC']]
    });
    return novels;
  }
  if (find === QUERY_NOVEL_FIND_DRAMA) {
    const novels = await Novel.findAll({
      where: { genre: QUERY_NOVEL_FIND_DRAMA },
      attributes: {
        exclude: 'userId'
      },
      include: includeOption,
      order: [['updatedAt', 'DESC']]
    });
    return novels;
  }
  if (find === QUERY_NOVEL_FIND_FANTASY) {
    const novels = await Novel.findAll({
      where: { genre: QUERY_NOVEL_FIND_FANTASY },
      attributes: {
        exclude: 'userId'
      },
      include: includeOption,
      order: [['updatedAt', 'DESC']]
    });
    return novels;
  }
  if (find === QUERY_NOVEL_FIND_ROMANCE) {
    const novels = await Novel.findAll({
      where: { genre: QUERY_NOVEL_FIND_ROMANCE },
      attributes: {
        exclude: 'userId'
      },
      include: includeOption,
      order: [['updatedAt', 'DESC']]
    });
    return novels;
  }
  if (find === QUERY_NOVEL_FIND_THRILLER) {
    const novels = await Novel.findAll({
      where: { genre: QUERY_NOVEL_FIND_THRILLER },
      attributes: {
        exclude: 'userId'
      },
      include: includeOption,
      order: [['updatedAt', 'DESC']]
    });
    return novels;
  }
  // const novels = await Novel.findAll({
  //   where: { userId },
  //   attributes: {
  //     exclude: 'userId'
  //   },
  //   include: includeOption,
  //   order: [['updatedAt', 'DESC']]
  // });
  // return novels;
};

exports.findMyNovels = async (userId) => {
  const userNovels = await Novel.findAll({
    where: { userId },
    include: { model: User, attributes: { exclude: 'password' } }
  });
  console.log(userNovels);
  return userNovels;
};
