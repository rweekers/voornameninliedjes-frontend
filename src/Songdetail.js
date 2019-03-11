import React, { Component } from 'react';
import update from 'immutability-helper';
import { Link } from "react-router-dom";
import axios from "axios";
import YouTube from 'react-youtube';
import Carousel from 'react-bootstrap/Carousel';
import './Songdetail.css';

const API = 'https://api.voornameninliedjes.nl/songs/';
const FLICKR = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&tags=music&text=';
const FLICKR_PHOTO_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&photo_id=';
const FLICKR_USER_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&user_id=';
const NUMBER_OF_PHOTOS = 5;

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
        // console.log(person);
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

        for (var i=0; i < song.flickrPhotos.length; i++) {
          this.findPhoto(song.flickrPhotos[i]);
        }

        const toSearch = Math.max(NUMBER_OF_PHOTOS - song.flickrPhotos.length, 0);

        if (toSearch > 0) {
          const searchPerPage = '&per_page=' + toSearch;

          axios.get(FLICKR + '\'' + song.artist + '\'' + searchPerPage)
          .then(response => {
            for (var i=0; i < response.data.photos.photo.length; i++){
              var photo = response.data.photos.photo[i];
              this.findPhoto(photo.id)
            }
          })
        }
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

          <div>
          {song.spotify &&
            <iframe src={`https://open.spotify.com/embed/track/${song.spotify}`} className="spotify" width="200" height="250" title={song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          }
          </div>

        </div>

        <Carousel controls={true}>
          {song.youtube &&
          <Carousel.Item key={song.id}>
            <iframe src={`https://www.youtube.com/embed/${song.youtube}?rel=0`}></iframe>
            <Carousel.Caption>
              <h3>{song.artist}</h3>
            </Carousel.Caption>
          </Carousel.Item>
          }
          {photos.map(photo =>
            <Carousel.Item key={photo.id}>
              <img
                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
                alt={photo.title}
                width="500px"
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
    return <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src={`https://www.youtube.com/embed/${props.yt}?rel=0`}></iframe>
          </div>
  } 
  else { 
    return <p>No video found</p>; 
  }
}

export default Songdetail;