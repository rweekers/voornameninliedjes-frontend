import React, { Component } from 'react';
import update from 'immutability-helper';
import { Link } from "react-router-dom";
import axios from "axios";
import YouTube from 'react-youtube';
import Carousel from 'react-bootstrap/Carousel';
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
        song.spotify = '62AuGbAkt8Ox2IrFFb8GKV';
        this.setState({ song: song });

        axios.get(FLICKR + song.artist + ' ' + song.title)
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
      <Link to='/'><h2>Terug</h2></Link>{' '}
        <p>{song.artist} - {song.title}</p>

        <div className="test">       
          <div className="background">
            <p>{song.background}</p>
          </div>

          <iframe src={`https://open.spotify.com/embed/track/${song.spotify}`} className="spotify" width="200" height="250" title={song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

        </div>

        <Carousel>
        <Carousel.Item key={song.id}>
            <YouTube yt={song.youtube} />
            <Carousel.Caption>
              <h3>{song.artist}</h3>
            </Carousel.Caption>
          </Carousel.Item>
          {photos.map(photo =>
            <Carousel.Item key={photo.id}>
            <img
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
              alt={photo.title}
            />
            <Carousel.Caption>
              <h3>{song.artist}</h3>
            </Carousel.Caption>
          </Carousel.Item>
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
