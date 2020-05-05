import React, { Component } from 'react';
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import './Songdetail.css';

const API = 'https://api.voornameninliedjes.nl/songs/';

class Songdetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      song: '',
      photo: '',
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
            song: song,
            hasWikiPhoto: true,
            wikiPhotoUrl: wikiPhoto.url,
            wikiPhotoAttribution: wikiPhoto.attribution
          });
        } else {
          const flickrPhoto = song.flickrPhotos[0];
          const contribution = {
            'ownerName': flickrPhoto.owner.username,
            'ownerUrl': flickrPhoto.owner.url,
            'photoTitle': flickrPhoto.title,
            'photoUrl': flickrPhoto.url,
            'licenseName': flickrPhoto.license.name,
            'licenseUrl': flickrPhoto.license.url
          };
          this.setState({
            song: song,
            photo: flickrPhoto,
            contribution: contribution
          });
        }
      });
  }

  render() {
    const song = this.state.song;
    const photo = this.state.photo;
    const contribution = this.state.contribution;
    const hasWikiPhoto = this.state.hasWikiPhoto;
    const wikiPhotoUrl = this.state.wikiPhotoUrl;
    const wikiPhotoAttribution = this.state.wikiPhotoAttribution;

    return (
      <div className="Songdetail">
        <header className="song-title"><h1>{song.artist}</h1><h2>{song.title}</h2></header>
        <content className="song-text"><ReactMarkdown source={song.background} /></content>
        <aside className="song-spotify">
          <iframe src={`https://open.spotify.com/embed/track/${song.spotify}`} className="spotify" width="100%" height="100%" title={song.title} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </aside>
        <aside className="song-youtube">
          <iframe src={`https://www.youtube-nocookie.com/embed/${song.youtube}?rel=0`} width="100%" height="100%" title={song.title}></iframe>
        </aside>
        <aside className="song-photos">
          {hasWikiPhoto ? (
            <div>
              <img
                src={wikiPhotoUrl} alt={song.artist}
              />
              <div className="attribution"><p>{wikiPhotoAttribution}</p></div>
            </div>
          ) : (
              <div>
                <img
                  src={photo.url}
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
