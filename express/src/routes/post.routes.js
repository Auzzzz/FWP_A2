module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/add", controller.create);

  // Get all posts that are not replies
  // AKA Header Posts
  router.get("/get", controller.getPostByHeader);

  // Get posts that corospond to a header post
  router.get("/get/:p_post_header", controller.getPostForHeader);

  // Create a like for a post.
  router.post("/like", controller.like);

  // Add routes to server.
  app.use("/api/post", router);
};
