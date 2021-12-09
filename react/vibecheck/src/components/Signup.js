import React, { useState } from "react";
import { SignUpAPI, CheckUsernameAPI, CheckEmailAPI } from "../data/repository";
import { validation } from "../data/validation";
import { Link } from "react-router-dom";

function Signup() {
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [susMessage, setSusMessage] = useState(null);

  // Individual Error messages
  const [username_error, setusername_Error] = useState(null);
  const [email_error, setemail_Error] = useState(null);
  const [first_name_error, setfirst_name_Error] = useState(null);
  const [last_name_error, setlast_name_Error] = useState(null);
  const [password_error, setpassword_Error] = useState(null);

  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear current erros
    setusername_Error();
    setemail_Error();
    setfirst_name_Error();
    setlast_name_Error();
    setpassword_Error();

    // Use an Object to store the submmited data
    const reg = {
      username: fields.username,
      email: fields.email,
      first_name: fields.first_name,
      last_name: fields.last_name,
      password: fields.password,
    };
    // send the object to get verified (data/validation.js)
    const val = await validation(reg);

    // if no errors exsist
    if (Object.keys(val).length === 0) {
      // Spin up the API connection and sen off the user info
      const user = await SignUpAPI(reg);

      // Collect the response
      let r = user;

      // Set Succsess message to show
      setSusMessage(
        reg.username +
          " has been created successfully, Please go to the Login page"
      );
    } else {
       
      
      if('username' in val){
        setusername_Error(val.username)
      }
      if('email' in val){
        setemail_Error(val.email)
      }
      if('first_name' in val){
        setfirst_name_Error(val.first_name)
      }
      if('last_name' in val){
        setlast_name_Error(val.last_name)
      }
      if('password' in val){
        setpassword_Error(val.password)
      }
      return;
    }
  };

  return (
    <div class="container">
      <div class="main-body">
        <div class="row">
        <div class="col-lg-12">
           
            {susMessage !== null && (
              <div class="alert alert-success ">
                <p class="text-center">{susMessage}</p>
              </div>
            )}
            </div>
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div
                    id="login-row"
                    class="row justify-content-center align-items-center"
                  >
                    <div id="login-column" class="col-md-6">
                      <div id="login-box" class="col-md-12">
                        <form onSubmit={handleSubmit}>
                          <h3 class="text-center text-info">Sign Up</h3>
                          <div id="login-box" class="col-md-12">
                            <label htmlFor="username" className="control-label">
                              Username
                            </label>
                            <input
                              name="username"
                              id="username"
                              className="form-control"
                              value={fields.username}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="password" className="control-label">
                              <p class="font-italic">Username needs to be between 5 and 32 characters</p>
                            
                            {username_error !== null && (
                              <span class="badge badge-danger">{username_error}</span>
                            )}
                            </label>
                          </div>
                          <div id="login-box" class="col-md-12">
                            <label htmlFor="email" className="control-label">
                              Email:
                            </label>
                            <input
                              name="email"
                              id="email"
                              className="form-control"
                              value={fields.email}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="password" className="control-label">
                              <p class="font-italic">Your RMIT Student Email</p>
                              {username_error !== null && (
                              <span class="badge badge-danger">{email_error}</span>
                            )}
                            </label>
                          </div>
                          <div id="login-box" class="col-md-12">
                            <label
                              htmlFor="first_name"
                              className="control-label">
                              First Name:
                            </label>
                            <input
                              name="first_name"
                              id="first_name"
                              className="form-control"
                              value={fields.first_name}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="password" className="control-label">
                              <p class="font-italic"></p>
                              {username_error !== null && (
                              <span class="badge badge-danger">{first_name_error}</span>
                            )}
                            </label>
                          </div>
                          <div id="login-box" class="col-md-12">
                            <label
                              htmlFor="last_name"
                              className="control-label"
                            >
                              Last Name:
                            </label>
                            <input
                              name="last_name"
                              id="last_name"
                              className="form-control"
                              value={fields.last_name}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="password" className="control-label">
                              <p class="font-italic"></p>
                              {username_error !== null && (
                              <span class="badge badge-danger">{last_name_error}</span>
                            )}
                            </label>
                          </div>
                          <div id="login-box" class="col-md-12">
                            <label htmlFor="password" className="control-label">
                              Password:
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              className="form-control"
                              value={fields.password}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="password" className="control-label">
                            {username_error !== null && (
                              <span class="badge badge-danger">{password_error}</span>
                            )}
                              <p class="font-italic">6 or more charters along with: </p>
                              <ul class="font-italic">
                                <li>Lower Case letters</li>
                                <li>Upper Case letters</li>
                                <li>Numbers</li>
                                <li>Special Character</li>
                              </ul>
                            </label>
                          </div>
                          <div id="register-link" class="text-right">
                            <input
                              type="submit"
                              className="btn btn-primary"
                              value="Signup"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
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

export default Signup;
