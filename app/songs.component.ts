import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {Song} from './song';
import {SongDetailComponent} from './song-detail.component';
import {SongService} from './song.service';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'my-songs',
    templateUrl: 'app/songs.component.html',
  	styleUrls: ['app/songs.component.css'],
	directives: [SongDetailComponent]
})
export class SongsComponent implements OnInit { 

	songs: Song[];
	selectedSong: Song;

	constructor(
		private _router: Router,
		private _songService: SongService) { }
	getSongs() {
		this._songService.getSongs().then(songs => this.songs = songs);
	}
	ngOnInit() {
		this.getSongs();
	}
	onSelect(song: Song) { this.selectedSong = song; }
	gotoDetail() {
		this._router.navigate(['SongDetail', { id: this.selectedSong.id }]);
	}
}