import React, { useState } from "react";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import "./Login.css";
import { login } from "../../api";
import { isValidMobileNumber } from "../../utilities";

const Login = ({ onLogin }) => {
  const [contactnumber, setContactNumber] = useState("9962299089");
  const [password, setPassword] = useState("Mani@1234");
  const [error, setError] = useState({
    login: false,
    contactNumber: false,
    password: false,
    invalidcontactNumber: false
  });

  const loginHandler = () => {
    if (!contactnumber || !password) {
      setError({
        ...error,
        contactNumber: !contactnumber,
        password: !password
      });
    } else if (!isValidMobileNumber(contactnumber)) {
      setError({
        ...error,
        invalidcontactNumber: true
      });
    } else if (contactnumber && password) {
      setError({
        ...error,
        login: false
      });

      login({
        contactnumber,
        password
      }).then(response => {
        if (response.code) {
          setError({
            ...error,
            login: response.message
          });
        } else {
          onLogin(response);
        }
      });
    } else {
      setError({
        ...error,
        login: true
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-conatiner">
        <div className="login-form">
          <FormControl>
            <InputLabel htmlFor="my-input">Contact No *</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={contactnumber}
              onChange={event => {
                setError({
                  ...error,
                  login: false,
                  contactNumber: false,
                  invalidcontactNumber: false
                });
                setContactNumber(event.target.value);
              }}
            />
            {error.contactNumber && (
              <span className="error-message">required</span>
            )}
            {error.invalidcontactNumber && (
              <span className="error-message">Invalid Contact</span>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Password *</InputLabel>
            <Input
              type="password"
              id="my-input"
              value={password}
              aria-describedby="my-helper-text"
              onChange={event => {
                setError({
                  ...error,
                  login: false,
                  password: false
                });
                setPassword(event.target.value);
              }}
            />
            {error.password && <span className="error-message">required</span>}
          </FormControl>
          {error.login && <span className="error-message">{error.login}</span>}
          <div className="btn-container">
            <Button
              variant="contained"
              color="primary"
              fullWidth={false}
              onClick={loginHandler}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
