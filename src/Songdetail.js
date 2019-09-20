import React, { Component } from 'react';
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import './Songdetail.css';

const API = 'https://api.voornameninliedjes.nl/songs/';
const FLICKR_PHOTO_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&photo_id=';
const FLICKR_USER_DETAIL = 'https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true&user_id=';
const FLICKR_LICENCES = 'https://api.flickr.com/services/rest/?method=flickr.photos.licenses.getInfo&api_key=9676a28e9cb321d2721e813055abb6dc&format=json&nojsoncallback=true'

class Songdetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      song: '',
      photo: '',
      owner: '',
      contribution: '',
      hasWikiPhoto: false,
      wikiPhotoUrl: '',
      wikiPhotoAttribution: ''
    };
  }

  componentDidMount() {
    const songId = this.props.match.params.id;

    axios.get(API + songId)
      .then(res => {
        const song = res.data;
        if (song.wikimediaPhotos.length > 0) {
          const wikiPhoto = song.wikimediaPhotos[0];
          this.setState({
            hasWikiPhoto: true,
            wikiPhotoUrl: wikiPhoto.url,
            wikiPhotoAttribution: wikiPhoto.attribution
          });
        }
        axios.get(FLICKR_PHOTO_DETAIL + song.flickrPhotos[0])
          .then(res => {
            const photo = res.data.photo;
            axios.get(FLICKR_USER_DETAIL + photo.owner.nsid)
              .then(res => {
                const owner = res.data.person;
                axios.get(FLICKR_LICENCES)
                  .then(res => {
                    const licenses = res.data.licenses.license;
                    const license = licenses.find(x => x.id === photo.license);
                    const licenseName = license.name;
                    const licenseUrl = license.url;
                    const contribution = {
                      'ownerName': owner.username._content,
                      'ownerUrl': owner.photosurl._content,
                      'photoTitle': photo.title._content,
                      'photoUrl': photo.urls.url[0]._content,
                      'licenseName': licenseName,
                      'licenseUrl': licenseUrl
                    };
                    this.setState({
                      song: song,
                      photo: photo,
                      owner: owner,
                      contribution: contribution
                    });
                  })
              })
          })
      });
  }

  render() {
    const song = this.state.song;
    const photo = this.state.photo;
    const contribution = this.state.contribution;
    const wikiPhotoUrl = this.state.wikiPhotoUrl;
    const wikiPhotoAttribution = this.state.wikiPhotoAttribution;
    const hasWikiPhoto = this.state.hasWikiPhoto;

    return (
      <div className="Songdetail">
        <header className="song-title"><h1>{song.artist}</h1><h2>{song.title}</h2></header>
        <content className="song-text"><ReactMarkdown source={song.background} /></content>
        <aside className="song-spotify">
          <iframe src={`https://open.spotify.com/embed/track/${song.spotify}`} className="spotify" width="100%" height="100%" title={song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </aside>
        <aside className="song-youtube">
          <iframe src={`https://www.youtube.com/embed/${song.youtube}?rel=0`} width="100%" height="100%" title={song.title}></iframe>
        </aside>
        <aside className="song-photos">
          {hasWikiPhoto ? (
            <div>
              <img
                src={wikiPhotoUrl}
              />
              <div className="attribution"><p>{wikiPhotoAttribution}</p></div>
            </div>
          ) : (
              <div>
                <img
                  src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
                  alt={photo.title}
                />
                <div className="attribution"><a href={contribution.photoUrl} target="_blank" rel="noopener noreferrer">Photo</a> by <a href={contribution.ownerUrl} target="_blank" rel="noopener noreferrer">{contribution.ownerName}</a> / <a href={contribution.licenseUrl} target="_blank" rel="noopener noreferrer">{contribution.licenseName}</a></div>
              </div>
            )}
        </aside>
      </div>
    );
  }
}

export default Songdetail;