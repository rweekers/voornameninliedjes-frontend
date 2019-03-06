import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
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
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={() => <Songlist songs={this.state.songs} />} />
                <Route path="/song/:id" component={Songdetail} />
              </Switch>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
