import React, { Component } from 'react';
import './Songlist.css';
import Songrow from './Songrow';

const API = 'https://api.voornameninliedjes.nl/songs';

class Songlist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({ songs: data });
      });
  }

  render() {
    return (
      <div className="Songlist">
        <ul>
          {this.state.songs.map(song =>
            <li key={song.id}>
              {/* <a href={song.artist}>{song.title}</a> */}
              <Songrow {...song} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Songlist;
