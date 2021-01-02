import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./Header.css";
import { Button, TextField, Menu, MenuItem } from "@material-ui/core";
import AppContext from "../app-context";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const Header = () => {
  const { searchKey, setSearchKey, isLoggedIn, setIsLoggedIn } = useContext(
    AppContext
  );
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    let token = sessionStorage.getItem("access-token");
    if (token) {
      setIsLoggedIn(true);
      setUserDetails(JSON.parse(sessionStorage.getItem("userDetails") || "{}"));
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onLogin = userDetails => {
    if (userDetails.code) {
    } else {
      sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      setUserDetails(userDetails);
      setIsOpen(false);
      setIsLoggedIn(true);
      setOpenSnackbar(true);
      setUserMessage("Logged in successfully!");
    }
  };

  const onSignup = () => {
    setValue(0);
    setOpenSnackbar(true);
    setUserMessage("Registered successfully!");
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("userDetails");
    sessionStorage.removeItem("access-token");
    history.push("/");
    handleClose();
  };

  return (
    <>
      <div className="header-container">
        <FastfoodIcon style={{ color: "#FFF" }} />
        <TextField
          id="outlined-basic"
          className="search-box"
          placeholder="Search by Restaurant Name"
          variant="standard"
          value={searchKey}
          onChange={event => setSearchKey(event.target.value)}
          InputProps={{
            startAdornment: <SearchIcon style={{ color: "#FFF" }} />
          }}
        />
        {isLoggedIn ? (
          <div className="avatar-menu">
            <Button
              variant="text"
              color="default"
              onClick={handleClick}
              startIcon={<AccountCircleIcon />}
            >
              {userDetails.first_name}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push("/profile");
                }}
              >
                My Account
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            variant="contained"
            color="default"
            onClick={() => setIsOpen(true)}
            startIcon={<AccountCircleIcon />}
          >
            Login
          </Button>
        )}
      </div>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Login onLogin={onLogin} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Signup onSignup={onSignup} />
        </TabPanel>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message={userMessage}
        autoHideDuration={3000}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};

export default Header;
