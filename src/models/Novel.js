const {
  NOVEL_ACTION,
  NOVEL_COMEDY,
  NOVEL_DRAMA,
  NOVEL_FANTASY,
  NOVEL_ROMANCE,
  NOVEL_THILLER,
  NOVEL_STATUS_ONGOING,
  NOVEL_STATUS_COMPLETED,
} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Novel = sequelize.define(
    'Novel',
    {
      title: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      genre: {
        type: DataTypes.ENUM(
          NOVEL_ACTION,
          NOVEL_COMEDY,
          NOVEL_DRAMA,
          NOVEL_FANTASY,
          NOVEL_ROMANCE,
          NOVEL_THILLER
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      synopsis: {
        type: DataTypes.STRING(800),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM(NOVEL_STATUS_ONGOING, NOVEL_STATUS_COMPLETED),
        allowNull: false,
        defaultValue: NOVEL_STATUS_ONGOING,
      },
      bookCoverUrl: DataTypes.STRING,
    },
    { underscored: true }
  );

  Novel.associate = (db) => {
    Novel.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Novel.hasMany(db.Chapter, {
      foreignKey: {
        name: 'novelId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Novel.hasMany(db.Review, {
      foreignKey: {
        name: 'novelId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Novel.hasMany(db.Library, {
      foreignKey: {
        name: 'novelId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Novel;
};
