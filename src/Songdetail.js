import React, { Component } from 'react';
import './Songdetail.css';

class Songdetail extends Component {
  render() {
    const song = this.props;

    return (
      <div className="Songdetail">
        <p>{song.artist} - {song.title}</p>
      </div>
    );
  }
}

export default Songdetail;
