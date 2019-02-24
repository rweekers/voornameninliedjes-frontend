import React, { Component } from 'react';
import logo from './record.svg';
import './App.css';
import Songlist from './Songlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hallo.
          </p>
          <Songlist/>
        </header>
      </div>
    );
  }
}

export default App;
