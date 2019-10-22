module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: 'post'
  });

  Post.associate = (models) => {
    Post.hasMany(models.Photo, {
      foreignKey: 'sourceId',
      onDelete: 'CASCADE'
    })
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
    })
  };
  return Post;
};
