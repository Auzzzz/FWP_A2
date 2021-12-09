import React, { useState, useEffect } from "react";
import { imgVal, imgSize } from "../data/tools";
import {
  getFromUsernameAPI,
  UpdateImgAPI,
  UpdateProfileAPI,
} from "../data/repository";

export default function MyProfile(props) {
  // State for user fields
  // hold user feedback messages
  const [errorMessage, setErrorMessage] = useState(null);
  const [susMessage, setsusMessage] = useState(null);
  // Hold the profile from the API
  const [profile, setProfile] = useState([]);
  // Hold the image for the profile if uploaded
  const [profileimg, setProfileIMG] = useState(null);
  // hold the changes to the user
  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    async function getProfile() {
      await getFromUsernameAPI(props.user).then(function (data) {
        setProfile(data.res);
        setProfileIMG(Buffer.from(data.res.img).toString());

      });
    }
    getProfile();
  }, []);

  // Image Change
  const onImageChange = async (event) => {
    const file = event.target.files[0];

    // go validate the image
    if (imgVal(file) == false) {
      errorMessage("Image must be a .jpeg, .jpg, .png");
      return;
    }
    if (imgSize(file) == false) {
      errorMessage("Image can not be any larger then 50k MB");
      return;
    }
    // use Filereader to conver the image to a uri, for storage
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      const r = await UpdateImgAPI(profile.UID, reader.result);
      if (r.res.status == 200) {
        setsusMessage("Image changed");
        setProfileIMG(reader.result);
      } else {
        setErrorMessage(
          "Unkown Error" + r.res.status + " PLease reupload the image"
        );
        return;
      }
    };
  };
  // upload the changes
  const handleSubmit = async (event) => {
    // prevent html default
    event.preventDefault();

    // Username Changer check
    var username_change = false;

    // set submit val
    const update = {
      UID: profile.UID,
      username: fields.username,
      email: fields.email,
      first_name: fields.first_name,
      last_name: fields.last_name,
    };

    // go through each option to see if it was changed and if not keep the original option

    // check if a field is null
    if (Object.keys(fields.username).length === 0) {
      update.username = profile.username;
    } else {
      update.username = fields.username;
      // Set the username change to true so we update the whole site
      username_change = true;
    }

    if (Object.keys(fields.first_name).length === 0) {
      update.first_name = profile.first_name;
    } else {
      update.first_name = fields.first_name;
    }

    if (Object.keys(fields.last_name).length === 0) {
      update.last_name = profile.last_name;
    } else {
      update.last_name = fields.last_name;
    }

    if (Object.keys(fields.email).length === 0) {
      update.email = profile.email;
    } else {
      update.email = fields.email;
    }
    const r = await UpdateProfileAPI(update);

    if (r.code == 200) {
      // Set user state.
      //props.loginUser(r.res.data.username);

      if (username_change == true) {
        // Set the new props username
        props.loginUser(r.newUsername);
        profile.username = props.user;
      }

      setErrorMessage("200");
      return;
    }
    if (r.code == 418) {
      setFields({ ...fields, password: "" });
      setErrorMessage(r.message);
      return;
    } else {
      setFields({ ...fields, password: "" });
      setErrorMessage("Unkown Error" + r.code);
      return;
    }
  };

  return (
    <div class="container">
      <div class="main-body">
        <div class="row">
          <div class="col-lg-12">
            {errorMessage !== null && (
              <div class="alert alert-danger" role="alert">
                <p class="text-center">{errorMessage}</p>
              </div>
            )}
            {susMessage !== null && (
              <div class="alert alert-success" role="alert">
                <p class="text-center">{susMessage}</p>
              </div>
            )}
          </div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <div class="mt-3">
                    <img width="200" height="200" src={profileimg} />
                    <h4>
                      {profile.first_name} {profile.last_name}
                    </h4>
                    <p class="mb-1">{profile.email}</p>
                  </div>
                  <label> Upload a new profile image </label>
                  <input
                    type="file"
                    id="img-input"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div class="card">
                <div class="card-body">
                  <h3> Edit Your Details: </h3>
                  <br />
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Username</h6>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        name="username"
                        class="form-control"
                        placeholder={profile.username}
                        onChange={handleInputChange}
                      />
                      <label>You will need to log out after a username change</label>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h6 class="mb-0">First Name</h6>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        name="first_name"
                        placeholder={profile.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Last Name</h6>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        name="last_name"
                        placeholder={profile.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Student Email</h6>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        placeholder={profile.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-9">
                      <input
                        type="submit"
                        class="btn btn-primary px-4"
                        value="Save Changes"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
