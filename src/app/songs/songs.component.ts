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
    this.getSongs();
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  getSongs(): void {
    this.songService.getSongs()
        .subscribe(songs => {
          this.songs = songs;
        });
  }

}
