import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Loading from '../Loading';
import { loginAction } from './action';

export class NavBarNotLogedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: 'kanishk1997', password: '123456' };
  }
  loginButtonOnClick() {
    const { username, password } = this.state;
    this.props.loginAction(username, password);
  }
  render() {
    return (
      <Grid container alignItems='center'>
        <Grid item xs={12} md={1}>
          <Loading />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h4' color='inherit'>
            Code Share
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container alignItems='center'>
            <Grid item xs={6} md={4}>
              <TextField
                data-test='username-input-field'
                id='outlined-name'
                label='Username or Email'
                variant='outlined'
                margin='dense'
                value={this.state.username}
                onChange={username => this.setState({ username: username.target.value })}
                onKeyPress={e => {
                  if (e.which === 13) this.loginButtonOnClick();
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                data-test='password-input-field'
                id='outlined-name'
                label='Password'
                type='password'
                variant='outlined'
                margin='dense'
                value={this.state.password}
                onChange={password => this.setState({ password: password.target.value })}
                onKeyPress={e => {
                  if (e.which === 13) this.loginButtonOnClick();
                }}
              />
            </Grid>
            <Grid item xs={8} md={4}>
              <Grid container>
                <Grid item xs={6}>
                  <Button
                    data-test='login-button'
                    variant='outlined'
                    color='inherit'
                    onClick={this.loginButtonOnClick.bind(this)}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button data-test='signup-button' variant='outlined' color='inherit'>
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  null,
  { loginAction }
)(NavBarNotLogedIn);
