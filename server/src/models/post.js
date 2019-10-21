module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Post.associate = (models) => {
    Post.hasMany(models.Photo, {
      foreignKey: 'sourceId',
      onDelete: 'CASCADE'
    })
    Post.belongsTo(models.User)
  };
  return Post;
};
