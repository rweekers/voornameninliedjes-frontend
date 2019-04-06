import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from './record.svg';
import logofreebsd from './freebsd-logo.png';
import './App.css';
import Songlist from './Songlist';
import Songdetail from './Songdetail';

const API = 'https://api.voornameninliedjes.nl/songs';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    axios.get(API)
      .then(response => {
        this.setState({ songs: response.data });
      });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <header className="app-header"><Link to='/'><img src={logo} className="app-logo" alt="logo" /></Link><h1>Voornamen in liedjes</h1><p></p></header>
          <aside className="app-side-left" />
          <aside className="app-side-right" />
          <content className="app-section">
            <Switch>
              <Route exact path="/" component={() => <Songlist songs={this.state.songs} />} />
              <Route path="/song/:id" component={Songdetail} />
            </Switch>
          </content>
          <footer className="app-footer"><p></p><h1>&copy; 2019 OrangeFlamingo</h1><img src={logofreebsd} className="freebsd-logo" alt="logo-freebsd" /></footer>
        </div>
      </Router>
    );
  }
}

export default App;
