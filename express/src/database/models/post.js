module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    post_text: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    p_post_header: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    p_post: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img:{
      type: DataTypes.BLOB('long'),
      allowNull: true
    }

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: true
  });
