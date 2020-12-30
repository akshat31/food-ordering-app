import React, { useState } from "react";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import "./Signup.css";
import { createCustomer } from "../../api";

const Signup = ({ onSignup }) => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [error, setError] = useState({
    login: false,
    contactNumber: false,
    password: false
  });

  const signupHandler = () => {
    createCustomer(customerDetails).then(response => {
      onSignup(customerDetails);
    });
  };

  return (
    <div className="login-container">
      <div className="login-form-conatiner">
        <div className="login-form">
          <FormControl>
            <InputLabel htmlFor="my-input">First Name *</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={customerDetails.first_name}
              onChange={event => {
                setError({
                  ...error,
                  login: false,
                  contactNumber: false
                });
                setCustomerDetails(event.target.value);
              }}
            />
            {error.contactNumber && (
              <span className="error-message">required</span>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Last Name </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={customerDetails.last_name}
              onChange={event => {
                setCustomerDetails(event.target.value);
              }}
            />
            {error.contactNumber && (
              <span className="error-message">required</span>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Email *</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={customerDetails.email_address}
              onChange={event => {
                setError({
                  ...error,
                  login: false,
                  contactNumber: false
                });
                setCustomerDetails(event.target.value);
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
              value={customerDetails.password}
              aria-describedby="my-helper-text"
              onChange={event => {
                setError({
                  ...error,
                  login: false,
                  password: false
                });
                setCustomerDetails(event.target.value);
              }}
            />
            {error.password && <span className="error-message">required</span>}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Contact No *</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={customerDetails.contact_number}
              onChange={event => {
                setError({
                  ...error,
                  login: false,
                  contactNumber: false
                });
                setCustomerDetails(event.target.value);
              }}
            />
            {error.contactNumber && (
              <span className="error-message">required</span>
            )}
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
              onClick={signupHandler}
            >
              Signup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
