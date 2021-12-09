const { DataTypes } = require("sequelize");
const db = require("../database");
const post_like = require("../database/models/post_like")(db.sequelize, DataTypes);
const user = require("../database/models/user")(db.sequelize, DataTypes);

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(posts);
};

// Create a post
exports.create = async (req, res) => {
  try {
    // Take in the req.body and turn into a object
    const p = JSON.parse(JSON.stringify(req.body));

    // Null check
    if (
      Object.keys(p.post_text).length === 0 ||
      Object.keys(p.UID).length === 0
    ) {
      res.status(418);
      return res.json({ error: "All values need to be filled out" });
    }

      // Insert into DB
      try {
        const posting = await db.post.create({
          post_text: p.post_text,
          p_post_header: p.p_post_header,
          p_post: p.p_post,
          img: p.img,
          UID: p.UID,
        });
        res.status(200);
        return res.json(posting);
        // insert catch
      } catch (e) {
        console.log("DB Insert issue");
        console.log(e);
        res.status(418);
        return res.json({ error: "Oh No please try again" });
      }
    // Top catch
  } catch (e) {
    console.log(e);
    res.status(418);
    return res.json({ error: "Invalid input" });
  }
};

// Select one user from the database.
exports.getPostByHeader = async (req, res) => {
  try {
    const p = await db.post.findAll({
      where: { p_post_header: null }, include: [db.user]
    });

    res.status(200);
    // convert to json
    return res.json(p);
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({ error: "Invalid user ID" });
  }
};

// Select one user from the database.
exports.getPostForHeader = async (req, res) => {
  try {
    const p = await db.post.findAll({
      where: { p_post_header: req.params.p_post_header}, include: [{model: user},{model: post_like}]
    });
    // Remove the password hash when returning to the user.... cause you know security or something
    // delete user[0].dataValues.password_hash;
    res.status(200);
    // convert to json
    console.log(res.json(p))
    return res.json(p);
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({ error: "Invalid user ID" });
  }
};

// Like a post
exports.like = async (req, res) => {
  try {
    // Take in the req.body and turn into a object
    const p = JSON.parse(JSON.stringify(req.body));

    // Null check
    if (
      Object.keys(p.post_id).length === 0 ||
      Object.keys(p.UID).length === 0
    ) {
      res.status(418);
      return res.json({ error: "All values need to be filled out" });
    }

      // Insert into DB
      try {
        const like = await db.post_like.create({
          post_id: p.post_id,
          UID: p.UID,
        });
        res.status(200);
        return res.json(like);
        // insert catch
      } catch (e) {
        console.log("DB Insert issue");
        console.log(e);
        res.status(418);
        return res.json({ error: "Oh No please try again" });
      }
    // Top catch
  } catch (e) {
    console.log(e);
    res.status(418);
    return res.json({ error: "Invalid input" });
  }
};
