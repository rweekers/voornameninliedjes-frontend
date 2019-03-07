import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from "axios";
import YouTube from 'react-youtube';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Songdetail.css';

const API = 'https://api.voornameninliedjes.nl/songs/';
const FLICKR = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&text=\'Neil Diamond\'&per_page=5';
const FLICKR_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&photo_id=';

class Songdetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      song: '',
      photos: []
    };
  }

findPhoto(photoId) {
  axios.get(FLICKR_DETAIL + photoId)
  .then(response => {
    const photo = response.data.photo;
    const newPhotos = update(this.state.photos, {$push: [photo]});
    this.setState({ photos: newPhotos});
  });
}

  componentDidMount() {
    this.id = this.props.match.params.id;

    axios.get(API + this.id)
      .then(response => {
        this.setState({ song: response.data });
      });

    axios.get(FLICKR)
      .then(response => {
        for (var i=0; i < response.data.photos.photo.length; i++){
          var photo = response.data.photos.photo[i];
          console.log(photo.id);
          this.findPhoto(photo.id)
        }
        console.log(response.data);
      })
  }

  render() {
    const song = this.state.song;
    const photos = this.state.photos;

    return (
      <div className="Songdetail">
        <p>{song.artist} - {song.title}</p>

        <div className="test">       
          <div className="background">
            <p>{song.background}</p>
          </div>

          <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Neil_Diamond_Aladdin_Theater_For_the_Performing_Arts_1976.jpg" alt={song.artist} className="image" />
        </div>

        <Carousel autoPlay="true" infiniteLoop="true" width="300px">
            {photos.map(photo =>
              <div>
                <img alt={photo.title} src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`} />
                <p className="legend">{song.artist}</p>
              </div>
            )}
        </Carousel>

        <YouTubeVideo yt={song.youtube} />
        <br />
        <iframe src="https://open.spotify.com/embed/track/62AuGbAkt8Ox2IrFFb8GKV" width="300" height="380" title="test" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
