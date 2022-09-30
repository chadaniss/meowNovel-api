module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    { underscored: true }
  );

  Review.associate = (db) => {
    Review.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Review.belongsTo(db.Novel, {
      foreignKey: {
        name: 'novelId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Review;
};
