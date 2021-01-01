import React, { useState } from "react";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import "./Signup.css";
import { createCustomer } from "../../api";
import {
  isValidMobileNumber,
  isValidEmail,
  isValidPassword
} from "../../utilities";

const Signup = ({ onSignup }) => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [error, setError] = useState({
    login: false,
    contactNumber: false,
    password: false
  });

  const signupHandler = () => {
    if (
      customerDetails &&
      (!customerDetails.first_name ||
        !customerDetails.email_address ||
        !customerDetails.contact_number ||
        !customerDetails.password)
    ) {
      setError({
        ...error,
        first_name: !customerDetails.first_name,
        email_address: !customerDetails.email_address,
        contact_number: !customerDetails.contact_number,
        password: !customerDetails.password
      });
    } else if (!isValidMobileNumber(customerDetails.contact_number)) {
      setError({
        ...error,
        invalidcontactNumber: true
      });
    } else if (!isValidEmail(customerDetails.email_address)) {
      setError({
        ...error,
        invalid_email_address: true
      });
    } else if (!isValidPassword(customerDetails.password)) {
      setError({
        ...error,
        invalid_password: true
      });
    } else
      createCustomer(customerDetails).then(response => {
        if (response.code) {
          setError({
            ...error,
            login: response.message
          });
        } else {
          onSignup(customerDetails);
        }
      });
  };

  const onInputChange = (value, dataLable) => {
    setCustomerDetails({
      ...customerDetails,
      [dataLable]: value
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
                  first_name: false
                });
                onInputChange(event.target.value, "first_name");
              }}
            />
            {error.first_name && (
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
                onInputChange(event.target.value, "last_name");
              }}
            />
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
                  email_address: false,
                  invalid_email_address: false
                });
                onInputChange(event.target.value, "email_address");
              }}
            />
            {error.email_address && (
              <span className="error-message">required</span>
            )}
            {error.invalid_email_address && (
              <span className="error-message">Invalid Email</span>
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
                  password: false,
                  invalid_password: false
                });
                onInputChange(event.target.value, "password");
              }}
            />
            {error.password && <span className="error-message">required</span>}
            {error.invalid_password && (
              <span className="error-message">
                Password must contain at least one capital letter, one small
                letter, one number, and one special character
              </span>
            )}
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
                  contact_number: false,
                  invalidcontactNumber: false
                });
                onInputChange(event.target.value, "contact_number");
              }}
            />
            {error.contact_number && (
              <span className="error-message">required</span>
            )}
            {error.invalidcontactNumber && (
              <span className="error-message">
                Contact No. must contain only numbers and must be 10 digits long
              </span>
            )}
          </FormControl>
          {error.login && <span className="error-message">{error.login}</span>}
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
