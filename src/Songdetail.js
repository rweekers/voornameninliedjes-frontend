import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from "axios";
import YouTube from 'react-youtube';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Songdetail.css';

const API = 'https://api.voornameninliedjes.nl/songs/';
const FLICKR = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&per_page=5&text=';
const FLICKR_PHOTO_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&photo_id=';
const FLICKR_USER_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&user_id=';

class Songdetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      song: '',
      photos: []
    };
  }

findPhoto(photoId) {
  axios.get(FLICKR_PHOTO_DETAIL + photoId)
  .then(response => {
    const photo = response.data.photo;

    axios.get(FLICKR_USER_DETAIL + photo.owner.nsid)
      .then(response => {
        const person = response.data.person;
        console.log(person);
      })

    const newPhotos = update(this.state.photos, {$push: [photo]});
    this.setState({ photos: newPhotos});
  });
}

  componentDidMount() {
    this.id = this.props.match.params.id;

    axios.get(API + this.id)
      .then(response => {
        const song = response.data;
        this.setState({ song: song });

        axios.get(FLICKR + song.artist)
        .then(response => {
          for (var i=0; i < response.data.photos.photo.length; i++){
            var photo = response.data.photos.photo[i];
            this.findPhoto(photo.id)
          }
        })
      });
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

          <iframe src="https://open.spotify.com/embed/track/62AuGbAkt8Ox2IrFFb8GKV" className="spotify" width="200" height="250" title={song.artist - song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

        </div>

        <Carousel autoPlay={true} infiniteLoop={true} thumbWidth="10px">
            {photos.map(photo =>
              <div key={photo.id}>
                <img alt={photo.title} src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`} />
                <p className="legend">{song.artist}</p>
              </div>
            )}
          </Carousel>
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
