module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Photo.associate = (models) => {
    Photo.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'sourceId',
    })
  };
  return Photo;
};
