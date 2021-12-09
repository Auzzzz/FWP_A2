import { CheckUsernameAPI, CheckEmailAPI } from "../data/repository";
const validation = async (reg) => {
  // List of erros to display
  const errors = {};
  let error_key = "";
  // Username Check Try
  try {
    // Username Check
    let username = reg.username;
    error_key = "username";

    // Encode the username so no scripts can run
    username = username.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // go through each check for username, adding in a error to the object
    if (username.length < 5) {
      errors[error_key] = "Username needs to be 5 characters or longer";
    } else if (username.length > 32) {
      errors[error_key] = "Username cannot be longer then 32 characters";
    }

    // Go through through and check if username is alrealy in use
    const username_check = await CheckUsernameAPI(username);
    if (username_check === false) {
      errors[error_key] = "Username Already in Use";
    }
    // Email Check Try
    try {
      // Email Check
      let email = reg.email;
      error_key = "email";

      // Encode the username so no scripts can run
      email = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      // go through each check for email, adding in a error to the object
      //check if the email matches the student email regex
      let regex = new RegExp("[s][0-9].+student.rmit.edu.au");
      if (!regex.test(email)) {
        errors[error_key] = "Email is not a student.rmit.edu.au email address";
      } else if (email.length < 15) {
        // could not get regex checking for length correctly, so when user inputs a correct student email the length should not be more then 15
        errors[error_key] =
          "Email must be have a correct student email address";
      }

      // Go through through and check if username is alrealy in use
      const email_check = await CheckEmailAPI(email);
      if (email_check === false) {
        errors[error_key] = "Email Already in Use";
      }
      // Name & Password Try
      try {
        // First name checker for length only
        let first_name = reg.first_name;
        error_key = "first_name";
        if (first_name.length < 2) {
          errors[error_key] = "First Name needs to be 2 characters or longer";
        } else if (first_name.length > 32) {
          errors[error_key] = "First Name cannot be longer then 32 characters";
        }
        // Last name checker for length only
        let last_name = reg.first_name;
        error_key = "last_name";

        if (last_name.length < 2) {
          errors[error_key] = "First Name needs to be 2 characters or longer";
        } else if (last_name.length > 32) {
          errors[error_key] = "First Name cannot be longer then 32 characters";
        }
        // Password checker for all the requirments
        let password = reg.password;
        error_key = "password";

        // Regex
        let regex_lower = new RegExp("[a-z]");
        let regex_upper = new RegExp("[A-Z]");
        let regex_num = new RegExp("[0-9]");
        let regex_spec = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/);

        if (password.length < 5) {
          errors[error_key] =
            "Password needs to be more 6 or more characters long";
        } else if (!regex_lower.test(password)) {
          errors[error_key] = "Password needs to have a lower case letter";
        } else if (!regex_upper.test(password)) {
          errors[error_key] = "Password needs to have a upper case letter";
        } else if (!regex_num.test(password)) {
          errors[error_key] = "Password needs to have a number";
        } else if (!regex_spec.test(password)) {
          errors[error_key] = "Password needs to have a special character";
        }

        // Name & Password check catch
      } catch (e) {
        console.log(e);
        errors["username_check"] = "Name & Password Error" + e;
      }

      // Email check catch
    } catch (e) {
      console.log(e);
      errors["username_check"] = "Email Check Error" + e;
    }

    // Username check catch
  } catch (e) {
    console.log(e);
    errors["username_check"] = "Username Check Error" + e;
  }

  return errors;
};

export { validation };
