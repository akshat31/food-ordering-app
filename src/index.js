import React, { useState } from "react";
import ReactDOM from "react-dom";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import AppRouter from "./common/router";
import { AppProvider } from "./common/app-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [currentRoute, setCurrentRoute] = useState("");
  const [cartDetails, setCartDetails] = useState({});

  return (
    <AppProvider
      value={{
        searchKey,
        setSearchKey,
        isLoggedIn,
        setIsLoggedIn,
        currentRoute,
        setCurrentRoute,
        cartDetails,
        setCartDetails
      }}
    >
      <AppRouter />
    </AppProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
