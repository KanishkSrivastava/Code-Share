import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const NavBarNotLogedIn = () => (
  <Grid container alignItems="center">
    <Grid item xs={12} md={7}>
      <Typography variant="h4" color="inherit">
        Code Share
      </Typography>
    </Grid>
    <Grid item xs={12} md={5}>
      <Grid container alignContent="space-between" alignItems="center">
        <Grid item xs={6} md={4}>
          <TextField
            id="outlined-name"
            label="Name"
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            id="outlined-name"
            label="Name"
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid item xs={8} md={4}>
          <Grid container>
            <Grid item xs={6}>
              <Button variant="outlined" color="inherit">
                Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="inherit">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
const NavBarLogedIn = () => (
  <Grid container>
    <Grid item xs={12}>
      <Button variant="outlined">Log Out</Button>
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
