import { SongService } from './../song.service';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  constructor(private songService: SongService) { }

  songs: Song[];

  ngOnInit() {
    console.log('Calling ngOnInit...')
    this.getSongs();
  }

  getSongs(): void {
    console.log('Getting songs.');
    this.songService.getSongs()
        .subscribe(songs => {
          console.log('Gotten songs ' + songs);
          this.songs = songs;
        });
  }

}
