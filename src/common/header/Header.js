import React, { useContext, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./Header.css";
import { Button, TextField } from "@material-ui/core";
import AppContext from "../app-context";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "./login/Login";
import Signup from "./signup/Signup";

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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

const Header = () => {
  const { searchKey, setSearchKey } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
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
        <Button
          variant="contained"
          color="default"
          onClick={() => setIsOpen(true)}
          startIcon={<AccountCircleIcon />}
        >
          Login
        </Button>
      </div>
      <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)}>
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
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Signup />
        </TabPanel>
      </Modal>
    </>
  );
};

export default Header;
