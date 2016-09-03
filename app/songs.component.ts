import { Component } from '@angular/core';
import { Song } from './song';
import { SONGS } from './mocks';

@Component({
  selector: 'songs',
  templateUrl: 'app/songs.component.html',
  styleUrls:['app/songs.component.css']
})
export class SongsComponent {
  songs: Song[];

  ngOnInit() {
    this.songs = SONGS;
  }
}
