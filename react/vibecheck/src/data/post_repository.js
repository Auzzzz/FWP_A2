import axios from "axios";

// Set keys
const API_KEY = "http://localhost:4000";

// Posts are split into 2 diffrent types
// Headers & replies, Headers are the first post made by a user
// then users reply to this user through replies.

// Get header Posts
async function getHeaderPosts() {
  // request API call with data

  // Send a Get request
  const t = await axios
    .get(API_KEY + "/api/post/get")
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      // return with a status code and the data
      console.log(res);
      return res;
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
        // React didnt recieve a response after sending / something went wrong with sending it (packet drops or somethig)
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
// Make apost
async function PostAPI(post) {
  // Send a Post request with json
  
  const t = await axios.post(API_KEY + "/api/post/add", {
      post_text: post.post_text,
      UID: post.UID,
      img: post.img,
      p_post_header: post.post_header
    })
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      // return with a status code and a message
      const r = {
        code: 200,
        res: res,
      };
      console.log(res);
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

// get all comments
async function getComments(Headerpost) {
  // request API call with data

  // Send a Get request
  const t = await axios
    .get(API_KEY + `/api/post/get/${Headerpost}`)
    // Await for the response then if it a 200 response collect the data
    .then((res) => {
      // return with a status code and the data
      console.log(res);
      return res;
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
        // React didnt recieve a response after sending / something went wrong with sending it (packet drops or somethig)
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

export { getHeaderPosts, PostAPI, getComments, };
