import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginAPI } from "../data/repository";

export default function Login(props) {
  const history = useHistory();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };
  //
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Null check
    if (
      Object.keys(fields.password).length === 0 ||
      Object.keys(fields.email).length === 0
    ) {
      // Return an error message and clear passord fields
      setFields({ ...fields, password: "" });
      setErrorMessage("Both Email & Password must be filled out");
      return;
    }

    // Go get user with email address
    const user = await LoginAPI(fields.email, fields.password);
    let r = user;

    if (r.code == 200) {
      setFields({ ...fields, password: "" });

      // Set user state.
      props.loginUser(r.res.data.username);

      // Navigate to the home page.
      history.push("/");

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
            <div align="center">
              <img src="./VibeCheck.png" height="250" alt="" />
            </div>
            {errorMessage !== null && (
              <div class="alert alert-danger" role="alert">
                <p class="text-center">{errorMessage}</p>
              </div>
            )}
            <div class="card">
              <div class="card-body">
                <div
                  id="login-row"
                  class="row justify-content-center align-items-center"
                >
                  <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                      <form onSubmit={handleSubmit}>
                        <h3 class="text-center text-info">Login</h3>
                        <div class="form-group">
                          <label for="email" class="text-info">
                            Email:
                          </label>
                          <input
                            name="email"
                            id="email"
                            className="form-control"
                            value={fields.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div class="form-group">
                          <label for="password" class="text-info">
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
                        </div>
                        <div id="register-link" class="text-right">
                          <input
                            type="submit"
                            className="btn btn-primary"
                            value="Login"
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
  );
}
