module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Photo.associate = (models) => {
    // associations can be defined here
  };
  return Photo;
};
