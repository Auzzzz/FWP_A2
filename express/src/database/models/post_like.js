module.exports = (sequelize, DataTypes) =>
  sequelize.define("post_like", {
    like_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
  }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });