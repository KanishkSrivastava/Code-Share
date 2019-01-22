import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import NavBarNotLogedIn from "./NavBarNotLogedIn";
const NavBarLogedIn = () => (
  <Grid container>
    <Grid item xs={12}>
      <Button data-test="logout-button" variant="outlined">
        Log Out
      </Button>
    </Grid>
  </Grid>
);
export default props => {
  return (
    <AppBar data-test="appbar-component">
      <Toolbar>
        {props.logedIn ? (
          <NavBarLogedIn data-test="appbar-loggedIn" />
        ) : (
          <NavBarNotLogedIn data-test="appbar-not-loggedIn" />
        )}
      </Toolbar>
    </AppBar>
  );
};
