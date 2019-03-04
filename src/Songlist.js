import React, { Component } from 'react';
import logo from './record.svg';
import './Songlist.css';
import Songrow from './Songrow';

class Songlist extends Component {

  render() {
    return (
      <div className="Songlist">
        <Total />
        <ul>
          {this.props.songs.map(song =>
            <li key={song.id}>
              <Songrow {...song} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function Total() {
  return <div><Image /><Test /></div>;
}

function Image() {
  return <img src={logo} className="App-logo" alt="logo" />;
}

function Test() {
  return <p>Hallo.</p>; 
}

export default Songlist;
