module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {}, { underscored: true });

  Library.associate = (db) => {
    Library.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Library.belongsTo(db.Novel, {
      foreignKey: {
        name: 'novelId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Library;
};
