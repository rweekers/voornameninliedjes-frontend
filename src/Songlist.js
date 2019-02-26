import React, { Component } from 'react';
import './Songlist.css';
import Songdetail from './Songdetail';

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
        console.log('data ' + data);
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
              <Songdetail song={song} />
            </li>
          )}
        </ul>
        <ul>
          <Songdetail/>
          <Songdetail/>
          <Songdetail/>
        </ul>
      </div>
    );
  }
}

export default Songlist;
