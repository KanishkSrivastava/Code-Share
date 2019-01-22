import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Navbar from './Navbar/Navbar';
import store from './store';
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar logedIn={false} />
      </Provider>
    );
  }
}

export default App;
