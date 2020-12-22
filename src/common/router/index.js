import React from "react";
import Home from "../../screens/home/Home";
import Details from "../../screens/details/Details";
import Checkout from "../../screens/checkout/Checkout";
import { BrowserRouter as Router, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <div className="main-container">
        <Route exact path="/" component={Home} />
        <Route path="/restaurant/:id" component={Details} />
        <Route path="/checkout" component={Checkout} />
      </div>
    </Router>
  );
};

export default AppRouter;
