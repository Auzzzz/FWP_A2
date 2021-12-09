import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

// // Initialise local storage data.
// initUsers();

// insertUser({username: "Dat", email: "test@test.com", password: "1234", signupDate: "12/10/2012"})
// insertUser({username: "Admin", email: "admin@test.com", password: "1234", signupDate: "12/10/2010"})




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
