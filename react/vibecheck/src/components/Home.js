import React, { useState, useEffect } from "react";
import { getHeaderPosts, PostAPI, getComments } from "../data/post_repository";
import { getFromUsernameAPI } from "../data/repository";
import { Link } from "react-router-dom";
import {
  imgVal,
  imgSize,
  dateFormatter,
  dateTimeFormatter,
} from "../data/tools";
function Home(props) {
  // State for post Headers
  const [headerPosts, setHeaderPosts] = useState({});
  // Hold if the page is still loading for API
  const [loading, setLoading] = useState(true);
  // Post / Reply items
  const [post, setPost] = useState({ p_text: "" });
  const [reply, setReply] = useState({ r_text: "" });
  // Error / Sucsess messages
  const [post_error, setPost_Error] = useState(null);
  const [post_suc, setPost_Suc] = useState(null);
  // Keep the profile from API
  const [profile, setProfile] = useState([]);
  // Keep all the comments from API
  const [comments, setComments] = useState({});
  // Hold if the comments are loading from the API
  const [comments_loading, setCommentsLoading] = useState(true);
  // Hold the Image uploaded
  const [img, setIMG] = useState(null);
  // hold the comment id for the reply
  const [comments_id, setComments_id] = useState(null);
  // Hold the provile the person is viewing
  const [view_profile, setView_profile] = useState([]);

  const [view_profile_loading, setView_profileLoading] = useState(true);
  // Get all of the posts
  async function getPosts() {
    await getHeaderPosts().then(function (data) {
      setHeaderPosts(data.data);
      setLoading(false);
    });
  }
  // get the user profile
  async function getProfile() {
    await getFromUsernameAPI(props.user).then(function (data) {
      setProfile(data.res);
      setView_profileLoading(false);
    });
  }
  // good ol useEffect to to call down the API
  useEffect(() => {
    getPosts();
    getProfile();
  }, []);
  // handle the inputs for a comment or a reply
  const handleInputChange = (event) => {
    if (event.target.name == "p_text") {
      setPost({ ...post, [event.target.name]: event.target.value });
    } else if (event.target.name == "r_text") {
      setReply({ ...reply, [event.target.name]: event.target.value });
    }
  };

  // Image Change
  const onImageChange = async (event) => {
    const file = event.target.files[0];
    // go validate the image in tools
    if (imgVal(file) == false) {
      setPost_Error("Image must be a .jpeg, .jpg, .png");
      return;
    }
    if (imgSize(file) == false) {
      setPost_Error("Image can not be any larger then 50k MB");
      return;
    }
    // use FileReader to convert the image into a uri to use in src & store
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      setIMG(reader.result);
      setPost_Suc("Image added");
    };
  };

  const likeComment = async (event) => {};


  // send the post to the API
  const handleSubmit = async (event) => {
    event.preventDefault();
    // set the header to null to make
    if (post.p_text.length == 0) {
      setPost_Error("You need to put something in the text box silly!");
      return;
    }
    // convert into a object
    const p = {
      post_text: post.p_text,
      UID: profile.UID,
      img: img,
      post_header: comments_id,
    };
    // send the object tot the API through data.post_repo
    const post_await = await PostAPI(p);
    let r = post_await;

    if (r.code == 200) {
      setPost({ ...post, p_text: "" });
      setPost_Suc("Post Successfully Made");
      getPosts();
    } else if (r.code == 418) {
      setPost_Error("Post Unsuccessfull");
    } else {
      setPost_Error("Unkown Error or the API is down... KEVIN!");
    }
  };
  // get the id of the post they want to see, if empty retyrb an error
  const commentSection = async (event) => {
    if (event.target.id.length == 0) {
      setPost_Error("Hold up..... Please try again");
      return;
    }
    // get the comments
    const c = await getComments(event.target.id).then(function (data) {
      setComments(data.data);
      setCommentsLoading(false);
      setComments_id(event.target.id);
    });

    // if (r.code == 418) {
    //   setPost_Error("Unsuccessfull atempt to load comments... please try again");
    // } else {
    //   setPost_Error("Unkown Error or the API is down... KEVIN!");
    // }

    // setComments("Yes it works");
  };
  // tell if the bootsrap model is open or if it has been closed.
  // this is to tell the post logic to mark it as a reply or a post
  function bootstrapModelOpen() {
    var modal = document.querySelectorAll(".modal.in, .modal.show");

    if (modal.length == 0) {
      setComments_id(null);
    }
  }
  // display the posting logic, it is the same for both reply's and posts
  function postDisplay() {
    if (props.user === null) {
      return (
        <div class="card">
          <div class="card-body">
            <p> Pssst... Hello do you wanna post something</p>
            <div>
              <p>
                Go{" "}
                <Link className="nav-link" to="/login">
                  Login
                </Link>{" "}
                or better yet{" "}
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
    }
    // loop through the posts
    return (
      <div class="card">
        <div class="card-body">
          {post_error !== null && (
            <div class="alert alert-danger" role="alert">
              <p class="text-center">{post_error}</p>
            </div>
          )}
          {post_suc !== null && (
            <div class="alert alert-success" role="alert">
              <p class="text-center">{post_suc}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              {/* <input id="header" name="header" value={comments_id} hidden/> */}
              <label for="exampleFormControlTextarea1">
                Got something to share {props.user}?
              </label>
              <textarea
                class="form-control"
                name="p_text"
                rows="3"
                value={post.p_text}
                onChange={handleInputChange}
              ></textarea>
              <label>Wanna share a image with that? </label> <br />
              <input
                type="file"
                id="img-input"
                accept="image/*"
                onChange={onImageChange}
              />
            </div>
            <div id="register-link" class="text-right">
              <input
                type="submit"
                className="btn btn-primary"
                value="Post"
                onClick={() => bootstrapModelOpen()}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div class="container">
      <div class="main-body">
        <div class="row">
          <div class="col-lg-12">
            {postDisplay()}

            {loading ? (
              <div class="card">
                <div class="card-body">
                  <p> Loading...... Why dont you go outside. </p>
                </div>
              </div>
            ) : (
              headerPosts.map((head) => (
                <div class="card">
                  <div class="card-body">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <div>
                          {head.user.img != null && (
                            <img
                              className="img_profile"
                              width="60"
                              height="60"
                              src={Buffer.from(head.user.img).toString()}
                            />
                          )}
                          <span class="user_header">
                            {head.user.username}
                            <a
                              class="badge badge-warning badge-profile"
                              data-toggle="modal"
                              data-target="#ProfileModel"
                              onClick={() => setView_profile(head.user)}
                              id={head.user}
                            >
                              View Profile
                            </a>
                            <a> {dateTimeFormatter(head.createdAt)}</a>
                          </span>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <p>{head.post_text}</p>{" "}
                      </li>
                      {head.img != null && (
                        <img
                          className="post_img"
                          width="60"
                          height="60"
                          src={Buffer.from(head.img).toString()}
                        />
                      )}
                      <div class="row">
                        {/* <div>
                      <button type="button"
                        class="btn btn-info"
                        onClick={likeComment}
                        id={head.post_id}> Like</button>

                        </div> */}
                      </div>
                      <button
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#comments"
                        onClick={commentSection}
                        id={head.post_id}
                      >
                        {" "}
                        View Comments / Reply{" "}
                      </button>
                    </ul>
                  </div>

                  <div
                    class="modal fade"
                    id="ProfileModel"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            {head.user.username}
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body text-center">
                          <ul class="list-group centre">
                            <li>
                              {view_profile.img != null && (
                                <img
                                  className="img_profile"
                                  width="200"
                                  height="200"
                                  src={Buffer.from(view_profile.img).toString()}
                                />
                              )}
                            </li>

                            <li>
                              <h3>Username: {view_profile.username}</h3>
                            </li>
                            <li>
                              <h4>
                                Name: {view_profile.first_name}{" "}
                                {view_profile.last_name}
                              </h4>
                            </li>
                            <li>
                              <h4>
                                Join Date:{" "}
                                {dateFormatter(view_profile.createdAt)}
                              </h4>
                            </li>
                          </ul>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary">
                            Follow User
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div
              class="modal fade comments"
              id="comments"
              tabindex="-1"
              role="dialog"
              aria-labelledby="comments"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    {comments_loading ? (
                      <div class="card">
                        <div class="card-body">
                          <p> Loading all the goodz </p>
                        </div>
                      </div>
                    ) : (
                      comments.map((c) => (
                        <div class="card">
                          <div class="card-body">
                            <div class="p-2">
                              <span class="round">
                                {c.user.img != null && (
                                  <img
                                    className="img_profile"
                                    src={Buffer.from(c.user.img).toString()}
                                    width="50"
                                    height="50"
                                  />
                                )}
                              </span>
                              <h5>{c.user.username}</h5>
                              <div>
                                <span>{dateTimeFormatter(c.createdAt)}</span>
                                <hr />
                              </div>
                              <p>{c.post_text}</p>
                            </div>
                            {c.img != null && (
                              <img
                                width="60"
                                height="60"
                                src={Buffer.from(c.img).toString()}
                              />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    {postDisplay()}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
