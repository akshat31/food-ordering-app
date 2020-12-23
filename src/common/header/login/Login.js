import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  Input,
  InputLabel,
  Button
} from "@material-ui/core";
import "./Login.css";
import AppContext from "../../app-context";
import { login } from "../../api";

const Login = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const history = useHistory();
  const [contactnumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    login: false,
    contactNumber: false,
    password: false
  });

  const loginHandler = () => {
    if (!contactnumber || !password) {
      setError({
        ...error,
        contactNumber: !contactnumber,
        password: !password
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
        history.push("/home");
        setIsLoggedIn(true);
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
                  contactNumber: false
                });
                setContactNumber(event.target.value);
              }}
            />
            {error.contactNumber && (
              <span className="error-message">required</span>
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
          {error.login && (
            <span className="error-message">
              Incorrect contactnumber and/or password
            </span>
          )}
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
