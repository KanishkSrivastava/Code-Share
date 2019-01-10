import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar logedIn={false} />
      </div>
    );
  }
}

export default App;
