import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./Header.css";
import { Button, TextField } from "@material-ui/core";

const Header = () => {
  return (
    <div className="header-container">
      <FastfoodIcon style={{ color: "#FFF" }} />
      <TextField
        id="outlined-basic"
        className="search-box"
        placeholder="Search by Restaurant Name"
        variant="standard"                
        InputProps={{
          startAdornment: <SearchIcon style={{ color: "#FFF" }}/>
        }}
      />
      <Button
        variant="contained"
        color="default"
        startIcon={<AccountCircleIcon />}
      >
        Login
      </Button>
    </div>
  );
};

export default Header;
