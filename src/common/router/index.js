import React, { Component } from "react";
import Home from "../../screens/home/Home";
import Details from "../../screens/details/Details";
import Checkout from "../../screens/checkout/Checkout";
import Profile from "../../screens/profile/Profile";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class AppRouter extends Component {
  constructor() {
    super();
    this.baseUrl = "http://localhost:8080/api/";
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          {/* Routing to the Home page */}
          <Route
            exact
            path="/"
            render={props => <Home {...props} baseUrl={this.baseUrl} />}
          />

          {/* Routing to the Details page */}
          <Route
            path="/restaurant/:id"
            render={props => <Details {...props} baseUrl={this.baseUrl} />}
          />

          {/* Routing to the Checkout page or redirect to the Home page based on the condition of customer-cart */}
          <Route
            path="/checkout"
            render={props =>
              sessionStorage.getItem("customer-cart") === null ? (
                <Redirect to="/" />
              ) : (
                <Checkout {...props} baseUrl={this.baseUrl} />
              )
            }
          />

          {/* Routing to the Profile page */}
          <Route
            path="/profile"
            render={props => <Profile {...props} baseUrl={this.baseUrl} />}
          />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
