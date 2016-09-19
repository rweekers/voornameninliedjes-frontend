import { Component, OnInit } from '@angular/core';
import { SongListService, Song } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  newSong: Song;
  artist: string;
  title: string;
  errorMessage: string;
  songs: Song[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * SongListService.
   *
   * @param {SongListService} songListService - The injected SongListService.
   */
  constructor(public songListService: SongListService) {}

  /**
   * Get the songs OnInit
   */
  ngOnInit() {
    this.getSongs();
  }

  /**
   * Handle the songListService observable
   */
  getSongs() {
    this.songListService.get()
        .subscribe(
          songs => this.songs = songs,
          error => this.errorMessage = <any>error
        );
  }

  /**
   * Pushes a new song onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addSong(): boolean {
    // TODO: implement songListService.post
    this.newSong = new Song();
    this.newSong.artist = this.artist;
    this.newSong.title = this.title;
    this.songs.push(this.newSong);
    this.artist = '';
    this.title = '';
    return false;
  }

}
