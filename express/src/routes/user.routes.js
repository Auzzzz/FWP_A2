module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Get a single user from ID
  router.get("/:id", controller.findByID);

  // Get a single user from ID
  router.get("/find/:username", controller.getByUsername);


  // Get a single user from Username
  router.get("/checku/:username", controller.findByUsername);

  // Get a single user from Email
  router.get("/checke/:email", controller.findByEmail);

  // Collect Email & Password, compare them against known emails 
  router.post("/login", controller.login);

  // Create a new user.
  router.post("/reg", controller.create);

  // Update a exsisting user
  router.post("/update", controller.update);

  // Update a exsisting user img
  router.post("/update/img", controller.img);

  // // Update a exsisting user
  // router.delete("/:id", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);
};
