import React, { Component } from 'react';
import update from 'immutability-helper';
import { Link } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
            console.log(person);
          })

        const newPhotos = update(this.state.photos, { $push: [photo] });
        this.setState({ photos: newPhotos });
      });
  }

  componentDidMount() {
    this.id = this.props.match.params.id;

    axios.get(API + this.id)
      .then(response => {
        const song = response.data;
        this.setState({ song: song });

        for (var i = 0; i < song.flickrPhotos.length; i++) {
          this.findPhoto(song.flickrPhotos[i]);
        }

        const toSearch = Math.max(NUMBER_OF_PHOTOS - song.flickrPhotos.length, 0);

        if (toSearch > 0) {
          const searchPerPage = '&per_page=' + toSearch;

          axios.get(FLICKR + '\'' + song.artist + '\'' + searchPerPage)
            .then(response => {
              for (var i = 0; i < response.data.photos.photo.length; i++) {
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
        <Container>
          <Row className="justify-content-md-center">
            <Link to='/'><h2>Terug</h2></Link>{' '}
          </Row>
          <Row className="justify-content-md-center">
            <p>{song.artist} - {song.title}</p>
          </Row>
          <Row>
            <Col xs={6}>
              <p>{song.background}</p>
            </Col>
            <Col>            {song.spotify &&
              <iframe src={`https://open.spotify.com/embed/track/${song.spotify}`} className="spotify" width="200" height="250" title={song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            }
              {!song.spotify &&
                <div>
                  <p><a href="https://giphy.com/gifs/cinemagraph-relaxing-jeff-bridges-96X6Pjaquq7cI">No spotify links yet!</a></p>
                  <iframe src="https://giphy.com/embed/96X6Pjaquq7cI" width="480" height="288" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
              }
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Carousel controls={true}>
              {song.youtube &&
                <Carousel.Item key={song.id}>
                  <iframe src={`https://www.youtube.com/embed/${song.youtube}?rel=0`} title={song.title}></iframe>
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default Songdetail;