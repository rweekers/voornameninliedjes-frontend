import React, { Component } from 'react';
import './Songrow.css';

class Songrow extends Component {
  render() {
    const song = this.props;

    return (
      <div className="Songrow">
        <p>{song.artist} - {song.title}</p>
      </div>
    );
  }
}

export default Songrow;
