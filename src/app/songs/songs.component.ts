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
  breakpoint: number;
  songsPaginated: Song[] = [];
  page: number = 0;

  ngOnInit() {
    this.getSongs();
    this.getSongsPaginated();
    this.breakpoint = (window.innerWidth <= 480) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
  }

  getSongs(): void {
    this.songService.getSongs()
      .subscribe(songs => {
        this.songs = songs;
      });
  }

  // To get song data from api  
  getSongsPaginated() {
    console.log(this.page);
    this.songService.getSongsPaginated(this.page).subscribe((res) => this.onSuccess(res));
  }

  // When we got data on a success  
  onSuccess(res) {
    console.log(res);
    if (res != undefined) {
      res.content.forEach(item => {
        this.songsPaginated.push(item);
      });
    }
  }

  // When scroll down the screen  
  onScroll() {
    console.log("Scrolled");
    this.page = this.page + 1;
    this.getSongsPaginated();
  }

}
