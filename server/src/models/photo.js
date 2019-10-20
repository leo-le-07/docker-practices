module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Photo.associate = (models) => {
    // associations can be defined here
  };
  return Photo;
};
