import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from './record_gold.png';
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
    var user = 'info',
    domain = 'voornameninliedjes.nl',
    element = document.getElementById('footerText');

    const email = user + '@' + domain;

    if (element != null) {
      element.innerHTML = email;
      element.setAttribute('href', 'mailto:' + email);
    }
    
    axios.get(API)
      .then(response => {
        this.setState({ songs: response.data });
      });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <header className="app-header"><Link to='/'><img src={logo} className="app-logo" alt="logo" /></Link><h1>Voornamen <span>in liedjes</span></h1><p></p></header>
          <aside className="app-side-left" />
          <aside className="app-side-right" />
          <content className="app-section">
            <Switch>
              <Route exact path="/" component={() => <Songlist songs={this.state.songs} />} />
              <Route path="/song/:id" component={Songdetail} />
            </Switch>
          </content>
          <footer className="app-footer"><p></p><div><h1>&copy; 2020 OrangeFlamingo </h1><a id="footerText" href="http://foo.bar">e-mail</a></div><a href="https://freebsd.org" target="blank"><img src={logofreebsd} className="freebsd-logo" alt="logo-freebsd" /></a></footer>
        </div>
      </Router>
    );
  }
}

export default App;
