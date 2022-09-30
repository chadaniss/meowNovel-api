const { CHAPTER_PUBLISH, CHAPTER_UNPUBLISH } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define(
    'Chapter',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM(CHAPTER_PUBLISH, CHAPTER_UNPUBLISH),
        allowNull: false,
        defaultValue: CHAPTER_UNPUBLISH,
      },
    },
    { underscored: true }
  );

  Chapter.associate = (db) => {
    Chapter.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Chapter.belongsTo(db.Novel, {
      foreignKey: {
        name: 'novelId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Chapter;
};