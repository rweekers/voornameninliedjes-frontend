import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './Songdetail.css';

const API = 'https://api.voornameninliedjes.nl/songs/';

class Songdetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      song: ''
    };
  }

  componentDidMount() {
    this.id = this.props.match.params.id;

    fetch(API + this.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ song: data });
      });
  }

  render() {
    const song = this.state.song;

    return (
      <div className="Songdetail">
        <p>{song.artist} - {song.title}</p>
        <p>{song.background}</p>

        <YouTubeVideo yt={song.youtube} />
      </div>
    );
  }
}

function YouTubeVideo(props) {
  if (props.yt) { 
    return <YouTube videoId={props.yt} />; 
  } 
  else { 
    return <p>No video found</p>; 
  }
}

export default Songdetail;
