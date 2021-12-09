import axios from "axios";

const USERS_KEY = "users";

// Set keys
const API_KEY = "http://localhost:4000";
const USER_KEY = "user";

//  *** USER API Calls ***

// Login
async function LoginAPI(email, password) {
  // request API call with data

  // Send a Post request with json
  const t = await axios
    .post(API_KEY + "/api/users/login", { email: email, password: password })
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      const user = {
        UID: res.data.UID,
        username: res.data.username,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
      };
      // Set the user
      setUser(user.username);
      console.log("GetUser" + getUser());
      // return with a status code and the data
      const r = {
        code: 200,
        res: res,
      };

      return r;
    })
    // If an error happens catch and return to front end
    .catch((err) => {
      if (err.response) {
        //return the error code & message to display
        const r = {
          code: err.response.status,
          message: err.response.data.error,
        };

        return r;
      } else if (err.request) {
        // React didnt recieve a response after sending / something went wrong with sending it
        const r = {
          code: 500,
          message: "No Response Recieved, HIT THE BRAKE GLASS AND RUN!!!",
        };
        return r;
      } else {
        // At this point whom knows (input faluilere)
        const r = {
          code: 503,
          message: "Something is really wrong, Enjoy the rest of your life!!!",
        };
      }
    });

  return t;
}

// Login
async function SignUpAPI(user) {
  // request API call with data

  // Send a Post request with json
  const t = await axios
    .post(API_KEY + "/api/users/reg", {
      username: user.username,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    })
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      // return with a status code and a message
      const r = {
        code: 200,
        message: "User successful registed",
      };

      return r;
    })
    // If an error happens catch and return to front end
    .catch((err) => {
      if (err.response) {
        //return the error code & message to display
        const r = {
          code: err.response.status,
          message: err.response.data.error,
        };

        return r;
      } else if (err.request) {
        // React didnt recieve a response after sending / something went wrong with sending it
        const r = {
          code: 500,
          message: "No Response Recieved, HIT THE BRAKE GLASS AND RUN!!!",
        };
        return r;
      } else {
        // At this point whom knows (input faluilere)
        const r = {
          code: 503,
          message: "Something is really wrong, Enjoy the rest of your life!!!",
        };
      }
    });

  return t;
}

// Get From Username
async function getFromUsernameAPI(username) {
  // request API call with data

  // Send a Post request with json
  const t = await axios
    .get(API_KEY + `/api/users/find/${username}`)
    // Await for the response then if it a 200 response collect the data
    .then((res) => {

      // return with a status code and the data
      const r = {
        code: 200,
        res: res.data,
      };

      return r;
    })
    // If an error happens catch and return to front end
    .catch((err) => {
      if (err.response) {
        //return the error code & message to display
        const r = {
          code: err.response.status,
          message: err.response.data.error,
        };

        return r;
      } else if (err.request) {
        // React didnt recieve a response after sending / something went wrong with sending it
        const r = {
          code: 500,
          message: "No Response Recieved, HIT THE BRAKE GLASS AND RUN!!!",
        };
        return r;
      } else {
        // At this point whom knows (input faluilere)
        const r = {
          code: 503,
          message: "Something is really wrong, Enjoy the rest of your life!!!",
        };
      }
    });

  return t;
}

// Check Username
async function CheckUsernameAPI(username) {
  // request API call with data

  // Send a Post request with json
  const t = await axios
    .get(API_KEY + `/api/users/checku/${username}`)
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      // Check the response and pass the true or false onto the username checker
      if (res.data.message == true) {
        return true;
      } else {
        return false;
      }
    })
    // If an error happens catch and return to front end
    .catch((err) => {
      if (err.response) {
        //return the error code & message to display
        const r = {
          code: err.response.status,
          message: err.response.data.error,
        };

        return r;
      } else if (err.request) {
        // React didnt recieve a response after sending / something went wrong with sending it
        const r = {
          code: 500,
          message: "No Response Recieved, HIT THE BRAKE GLASS AND RUN!!!",
        };
        return r;
      } else {
        // At this point whom knows (input faluilere)
        const r = {
          code: 503,
          message: "Something is really wrong, Enjoy the rest of your life!!!",
        };
      }
    });

  return t;
}

// Check Username
async function CheckEmailAPI(email) {
  // request API call with data

  // Send a Post request with json
  const t = await axios
    .get(API_KEY + `/api/users/checke/${email}`)
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      // Check the response and pass the true or false onto the username checker
      if (res.data.message == true) {
        return true;
      } else {
        return false;
      }
    })
    // If an error happens catch and return to front end
    .catch((err) => {
      if (err.response) {
        //return the error code & message to display
        const r = {
          code: err.response.status,
          message: err.response.data.error,
        };

        return r;
      } else if (err.request) {
        // React didnt recieve a response after sending / something went wrong with sending it
        const r = {
          code: 500,
          message: "No Response Recieved, HIT THE BRAKE GLASS AND RUN!!!",
        };
        return r;
      } else {
        // At this point whom knows (input faluilere)
        const r = {
          code: 503,
          message: "Something is really wrong, Enjoy the rest of your life!!!",
        };
      }
    });

  return t;
}

async function UpdateImgAPI(uid, img){
  // Send a Post request with json
  const t = await axios
    .post(API_KEY + "/api/users/update/img", { UID: uid, img: img })
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      const r = {
        res: res,
      };
      return r;
    })
    // If an error happens catch and return to front end
    .catch((err) => {
      if (err.response) {
        //return the error code & message to display
        const r = {
          code: err.response.status,
          message: err.response.data.error,
        };

        return r;
      } else if (err.request) {
        // React didnt recieve a response after sending / something went wrong with sending it
        const r = {
          code: 500,
          message: "No Response Recieved, HIT THE BRAKE GLASS AND RUN!!!",
        };
        return r;
      } else {
        // At this point whom knows (input faluilere)
        const r = {
          code: 503,
          message: "Something is really wrong, Enjoy the rest of your life!!!",
        };
      }
    });

  return t;
}

async function UpdateProfileAPI(profile){
  // Send a Post request with json
  const t = await axios
    .post(API_KEY + "/api/users/update", {
      UID: profile.UID,
      username: profile.username,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
    })
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      const r = {
        code: 200,
        newUsername: res.data.newUsername
      };
      return r;
    })
    // If an error happens catch and return to front end
    .catch((err) => {
      if (err.response) {
        //return the error code & message to display
        const r = {
          code: err.response.status,
          message: err.response.data.error,
        };

        return r;
      } else if (err.request) {
        // React didnt recieve a response after sending / something went wrong with sending it
        const r = {
          code: 500,
          message: "No Response Recieved, HIT THE BRAKE GLASS AND RUN!!!",
        };
        return r;
      } else {
        // At this point whom knows (input faluilere)
        const r = {
          code: 503,
          message: "Something is really wrong, Enjoy the rest of your life!!!",
        };
      }
    });

  return t;
}

// Local Storage Functions
function setUser(user) {
  localStorage.setItem(USER_KEY, user);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  getUser,
  removeUser,
  LoginAPI,
  SignUpAPI,
  CheckUsernameAPI,
  CheckEmailAPI,
  getFromUsernameAPI,
  UpdateImgAPI,
  UpdateProfileAPI,
  
};
