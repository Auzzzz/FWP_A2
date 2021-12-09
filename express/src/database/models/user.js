// input var so UUID works
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes ) =>
  sequelize.define("user", {
    UID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(28),
      allowNull: false
    },
    img:{
      type: DataTypes.BLOB('long'),
      allowNull: true
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: true
  });