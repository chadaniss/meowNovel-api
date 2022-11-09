const { CHAPTER_PUBLISH, CHAPTER_UNPUBLISH } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define(
    'Chapter',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  Chapter.associate = (db) => {
    Chapter.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Chapter.belongsTo(db.Novel, {
      foreignKey: {
        name: 'novelId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Chapter;
};
