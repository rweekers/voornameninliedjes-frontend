import React, { Component } from 'react';
import './Songlist.css';
import Songrow from './Songrow';

class Songlist extends Component {

  render() {
    return (
      <div className="Songlist">
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

export default Songlist;
