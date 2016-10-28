import { Component, OnInit } from '@angular/core';
import { SongListService, Song } from '../shared/index';
import { Observable } from 'rxjs/Observable';

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
  songs: Song[];
  p : number = 1;
  total: number;
  loading: boolean;
  mode: 'Observable';

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
    this.getSongs(1);
    this.total = 10;
  }

  /**
   * Handle the songListService observable
   */
  getSongs(page: number) {
      this.loading = true;
      this.songListService.get(page)
          .subscribe(
            songs => this.songs = songs,
            error => this.errorMessage = <any>error
          );
          this.p = page;
          this.loading = false;
        }
}
