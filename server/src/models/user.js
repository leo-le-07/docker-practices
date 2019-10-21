module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      as: 'posts',
      onDelete: 'CASCADE',
    })
  };

  return User;
};
