import { Component } from '@angular/core';
import { Song } from './song';
import { SongDataService } from './song-data.service';

@Component({
  selector: 'songs',
  templateUrl: 'app/songs.component.html',
  styleUrls:['app/songs.component.css']
})
export class SongsComponent {
  songs: Song[];

  constructor(private songDataService: SongDataService) { }

  ngOnInit() {
    this.songs = this.songDataService.getSongs();
  }
}
