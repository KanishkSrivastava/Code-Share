import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Loading from '../Loading';
import NavBarNotLogedIn from './NavBarNotLogedIn';

const NavBarLogedIn = () => (
  <Grid container>
    <Grid item xs={12} md={1}>
      <Loading />
    </Grid>
    <Grid item xs={12} md={11}>
      <Button data-test='logout-button' variant='outlined'>
        Log Out
      </Button>
    </Grid>
  </Grid>
);
export default props => {
  return (
    <AppBar m={2} data-test='appbar-component'>
      <Toolbar>
        {props.logedIn ? (
          <NavBarLogedIn data-test='appbar-loggedIn' />
        ) : (
          <NavBarNotLogedIn data-test='appbar-not-loggedIn' />
        )}
      </Toolbar>
    </AppBar>
  );
};
