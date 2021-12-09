import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="navbar-brand mt-2 mt-lg-0" href="#">
            <img src="./VibeCheck.png" height="40" alt="" />
          </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">
              <Link className="nav-link" to="/home">Home</Link>
              </a>
            </li>
            {props.user !== null && <>
            <li class="nav-item">
              <a class="nav-link">
              <Link className="nav-link" to="/profile">Profile</Link>
              </a>
            </li>
            </>}
          </ul>
        </div>
        <div class="d-flex align-items-center">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {props.user === null ?
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                  </ul>
                  :
                  <>
                  <li className="nav-item">
                   <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
                 </li>
               </>
             }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
