const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.post_like = require("./models/post_like.js")(db.sequelize, DataTypes);
db.following = require("./models/following.js")(db.sequelize, DataTypes);

// ** Relationships **
// Relate post and user.
db.post.belongsTo(db.user, { foreignKey: { name: "UID", allowNull: false } });
db.user.hasMany(db.post);
db.post.hasMany(db.post_like);
// User liking another post
// bring in the post_id
db.post_like.belongsTo(db.post, { foreignKey: { name: "post_id", allowNull: false } });
// bring in uid sof the user
db.post_like.belongsTo(db.user, { foreignKey: { name: "UID", allowNull: false } });

// Following
// Follower of another user
db.following.belongsTo(db.user, { foreignKey:'follower' , name: "UID", allowNull: false });
// Who the user is following
db.following.belongsTo(db.user, { foreignKey:'following' , name: "UID", allowNull: false });


// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "ck", password_hash: hash, first_name: "Matthew", last_name : "Bolger", email: "test@test.com" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "ak", password_hash: hash, first_name: "Shekhar", last_name : "Kalra", email: "test@test.com" });
}

module.exports = db;
