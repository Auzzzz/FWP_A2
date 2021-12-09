module.exports = (sequelize, DataTypes) =>
  sequelize.define("following", {
    follow_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });