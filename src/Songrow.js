import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Songrow.css';

class Songrow extends Component {
  render() {
    const song = this.props;
    const spotify = '62AuGbAkt8Ox2IrFFb8GKV';

    return (
      <div className="Songrow">
        <Link to={'/song/' + song.id}><p>{song.artist} - {song.title}</p></Link>{' '}
      </div>
    );
  }
}

export default Songrow;
