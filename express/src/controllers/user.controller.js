const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  try {
    // Use findAll() to get all users from the DB
    const users = await db.user.findAll();
    // return json
    return res.json(users);
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({
      error: "Either no users in the DB or someone fucked up.... probs both",
    });
  }
};

// Select one user from the database.
exports.findByID = async (req, res) => {
  try {
    const user = await db.user.findAll(req.params.id);

    // Remove the password hash when returning to the user.... cause you know security or something
    // Oh remove email aswell
    delete user.dataValues.password_hash;
    delete user.dataValues.email;

    // convert to json
    return res.json(user);
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({ error: "Invalid user ID" });
  }
};

// Select one user from the database.
exports.getByUsername = async (req, res) => {
  try {
    const user = await db.user.findAll({
      where: { username: req.params.username },
    });
    console.log(user[0].dataValues);
    // Remove the password hash when returning to the user.... cause you know security or something
    delete user[0].dataValues.password_hash;

    res.status(200);
    // convert to json
    return res.json(user[0].dataValues);
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({ error: "Invalid user ID" });
  }
};

// Use a username to see if a profile already has the username
exports.findByUsername = async (req, res) => {
  try {
    const user = await db.user.findAll({
      where: { username: req.params.username },
    });
    // const user = await db.user.findAll({ where: { UID: form.UID } });

    // If the qurey returns a user return true, else flase it is
    if (Object.keys(user).length !== 0) {
      res.status(200);
      // Turns out you can return true or false by its self
      return res.json({ message: false });
    } else {
      delete user.dataValues.password_hash;
      res.status(200);
      return res.json({ message: true });
    }
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({ error: "Invalid input" });
  }
};

// Use a email to see if a profile already has the username
exports.findByEmail = async (req, res) => {
  try {
    const user = await db.user.findAll({ where: { email: req.params.email } });
    // const user = await db.user.findAll({ where: { UID: form.UID } });

    // If the qurey returns a user return true, else flase it is
    if (Object.keys(user).length !== 0) {
      res.status(200);
      // Turns out you can return true or false by its self
      return res.json({ message: false });
    } else {
      res.status(200);
      return res.json({ message: true });
    }
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({ error: "Invalid input" });
  }
};

// Get the JSON values and check with the DB that the email exsits,
// Get the User and check the password, return user account if valid
exports.login = async (req, res) => {
  try {
    // Take in the req.body and turn into a object
    const login = JSON.parse(JSON.stringify(req.body));

    // Null check
    if (
      Object.keys(login.email).length === 0 ||
      Object.keys(login.password).length === 0
    ) {
      res.status(418);
      return res.json({ error: "Both Email & Password must be filled out" });
    }

    // Use Email to find account
    try {
      // Get the user from the DB using the email address
      // Select * from user where email = email
      const user = await db.user.findAll({ where: { email: login.email } });
      // Null check
      if (Object.keys(user).length === 0) {
        res.status(418);
        return res.json({ error: "Email & or Password are incorrect" });
      }

      // Check the password against the inserted password
      try {
        // Use argon to dehash the password and verify the two passwords
        if (
          await argon2.verify(user[0].dataValues.password_hash, login.password)
        ) {
          // User is allowed
          // Dont send back the password Hash
          delete user[0].dataValues.password_hash;
          res.status(200);
          return res.json(user[0].dataValues);
        } else {
          // Users details are wrong
          res.status(418);
          return res.json({ error: "Email & or Password are incorrect" });
        }
      } catch (err) {
        // ERROR ha
        console.log(err);
        res.status(418);
        return res.json({
          error: "Excuess us we apear to have it a snag. plz try again",
        });
      }
      // find email try catch
    } catch (e) {
      console.log(e);
      res.status(418);
      return res.json({ error: "DB Error" });
    }
    // top try
  } catch (e) {
    console.log(e);

    res.status(418);
    return res.json({ error: "Invalid input" });
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    // Take in the req.body and turn into a object
    const form = JSON.parse(JSON.stringify(req.body));
    // Null check
    if (
      Object.keys(form.username).length === 0 ||
      Object.keys(form.password).length === 0 ||
      Object.keys(form.first_name).length === 0 ||
      Object.keys(form.last_name).length === 0 ||
      Object.keys(form.email).length === 0
    ) {
      res.status(418);
      return res.json({ error: "All values need to be filled out" });
    }

    // Check the email to ensure it is a students
    if (email_val(form.email) == false) {
      res.status(418);
      return res.json({ error: "Invalid email address" });
    }

    // Call in the email_check function
    var email_checker = await email_check(form.email);

    // Return the correct status & json
    if (email_checker == "error") {
      console.log("Error");
      res.status(418);
      return res.json({
        error: "Sorry something went wrong, please try again",
      });
    } else if (email_checker == true) {
      console.log("email already exsists");
      res.status(418);
      return res.json({ error: "email already exsists" });
    }

    // Call in the email_check function
    var username_checker = await username_check(form.username);

    // Return the correct status & json
    if (username_checker == "error") {
      console.log("Error");
      res.status(418);
      return res.json({
        error: "Sorry something went wrong, please try again",
      });
    } else if (username_checker == true) {
      console.log("Username already exsists please slected another one");
      res.status(418);
      return res.json({
        error: "Username already exsists please slected another one",
      });
    }

    // Convert the password into a hash
    try {
      const hash = await argon2.hash(form.password, {
        type: argon2.argon2id,
      });

      // Insert into DB
      try {
        const user = await db.user.create({
          username: form.username,
          password_hash: hash,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
        });
        res.status(200);
        return res.json(user);
        // insert catch
      } catch (e) {
        console.log("DB Insert issue");
        console.log(e);
        res.status(418);
        return res.json({ error: "Oh No please try again" });
      }
      //hash catch
    } catch (e) {
      console.log("Hashing issue");
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

exports.update = async (req, res) => {
  try {
    // Take in the req.body and turn into a object
    const form = JSON.parse(JSON.stringify(req.body));

    // Null check
    if (
      Object.keys(form.UID).length === 0 ||
      Object.keys(form.username).length === 0 ||
      Object.keys(form.first_name).length === 0 ||
      Object.keys(form.last_name).length === 0 ||
      Object.keys(form.email).length === 0
    ) {
      res.status(418);
      return res.json({ error: "All values need to be filled out" });
    }

    try {
      // Get the exsisting user profile
      const user = await db.user.findAll({ where: { UID: form.UID } });

      // Check if there is a respose
      if (Object.keys(user).length === 0) {
        res.status(418);
        return res.json({
          error: "UID error, Stop trying to brake me, else contact a Admin plz",
        });
      }

      // Check each part for diffrence
      // Check username
      if (
        form.username.toLowerCase() != user[0].dataValues.username.toLowerCase()
      ) {
        // Run username checks
        // Call in the email_check function
        var username_checker = await username_check(form.username);

        // Return the correct status & json
        if (username_checker == "error") {
          console.log("Error");
          res.status(418);
          return res.json({
            error: "Sorry something went wrong, please try again",
          });
        } else if (username_checker == true) {
          console.log("Username already exsists please slected another one");
          res.status(418);
          return res.json({
            error: "Username already exsists please slected another one",
          });
        }
      }

      // Check email
      if (form.email.toLowerCase() != user[0].dataValues.email.toLowerCase()) {
        // Run username checks
        // Check the email to ensure it is a students
        if (email_val(form.email) == false) {
          res.status(418);
          return res.json({ error: "Invalid email address" });
        }

        // Call in the email_check function
        var email_checker = await email_check(form.email);

        // Return the correct status & json
        if (email_checker == "error") {
          console.log("Error");
          res.status(418);
          return res.json({
            error: "Sorry something went wrong, please try again",
          });
        } else if (email_checker == true) {
          console.log("email already exsists");
          res.status(418);
          return res.json({ error: "email already exsists" });
        }
      }
      // Update insert into DB
      try {
        const user = await db.user.update(
          {
            username: form.username,
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
          },
          { where: { UID: form.UID } }
        );

        // Get the return and check if the user was updated or not
        if (JSON.stringify(user[0]) >= 1) {
          res.status(200);
          return res.json({ newUsername: form.username });
        } else if (JSON.stringify(user[0]) < 1) {
          res.status(200);
          return res.json({ error: "User not updted" });
        }
        // insert catch
      } catch (e) {
        console.log("DB Insert issue");
        console.log(e);
        res.status(418);
        return res.json({ error: "Oh No please try again" });
      }
      // Get & compare user catch
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

exports.img = async (req, res) => {
  try {
    // get the data
    const form = JSON.parse(JSON.stringify(req.body));

    // Null check
    if (
      Object.keys(form.UID).length === 0 ||
      Object.keys(form.img).length === 0
      
    ) {
      res.status(418);
      return res.json({ error: "All values need to be filled out" });
    }
    // Insert Try
    try {

      const img = await db.user.update(
        {
          img: form.img
        },
        { where: { UID: form.UID } }
      );
      // Get the return and check if the user was updated or not
      if (JSON.stringify(img[0]) >= 1) {
        res.status(200);
        
        return res.json();
      } else if (JSON.stringify(img[0]) < 1) {
        res.status(200);
        return res.json({ error: "Img not updted" });
      }


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

// Functions to share between Create & Update

// Check the email against a regex expression
// Return True / False depending on suscess
function email_val(email) {
  var re = new RegExp("[s][0-9].+student.rmit.edu.au");
  if (!re.test(email)) {
    res.status(418);
    return false;
  } else {
    return true;
  }
}

// Check if the email is already in use
// return True / False / Error depending if the email is in use
async function email_check(email) {
  try {
    var emailcheck = await db.user.findAll({ where: { email: email } });
    // Check to see if the emailcheck has any data in it
    if (Object.keys(emailcheck).length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log("email check");
    console.log(e);
    return "error";
  }
}

// Check if the username is already in use
// return True / False / Error depending if the username is in use
async function username_check(username) {
  try {
    var usernamecheck = await db.user.findAll({
      where: { username: username },
    });

    if (Object.keys(usernamecheck).length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log("username check");
    console.log(e);
    return "error";
  }
}
