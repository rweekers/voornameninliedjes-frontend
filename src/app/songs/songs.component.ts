import { SongService } from './../song.service';
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
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
  songsPaginated: Set<Song> = new Set();
  page: number = 0;
  filter: string = '';
  isSticky: boolean = false;
  @ViewChild('myHeader') header: ElementRef;
  offsetY: number;

  ngOnInit() {
    // this.getSongs();
    this.getSongsPaginated(this.filter);
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.offsetY = this.header.nativeElement.offsetTop;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  getSongs(): void {
    this.songService.getSongs()
      .subscribe(songs => {
        this.songs = songs;
      });
  }

  // To get song data from api  
  getSongsPaginated(filter: string) {
    console.log(this.page);
    this.songService.getSongsPaginated(this.filter, this.page).subscribe((res) => this.onSuccess(res));
  }

  // When we got data on a success  
  onSuccess(res) {
    console.log(res);
    if (res != undefined) {
      res.content.forEach(item => {
        this.songsPaginated.add(item);
      });
    }
  }

  // When scroll down the screen  
  onScrollDown() {
    this.page = this.page + 1;
    this.getSongsPaginated(this.filter);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.determineStickySearchField();
  }

  onKey(event: any) { // without type info
    this.songsPaginated = new Set();
    this.filter = event.target.value;
    this.scrollToTop();
    if (this.filter === "") {
      this.page = 0;
    }
    this.getSongsPaginated(this.filter);
  }

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  determineStickySearchField() {
    // Get the offset position of the screen and compare with searchbar
    if (window.pageYOffset > this.offsetY) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}
