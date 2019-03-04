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

        <div class="test">       
          <div className="background">
            <p>{song.background}</p>
          </div>

          <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Neil_Diamond_Aladdin_Theater_For_the_Performing_Arts_1976.jpg" className="image" />
        </div>

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
