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
        <iframe src={`https://open.spotify.com/embed/track/${spotify}`} className="spotify" width="200" height="250" title={song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    );
  }
}

export default Songrow;
