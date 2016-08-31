import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Song } from './song';
import { SongService } from './song.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
	
	songs: Song[] = [];
	
	constructor(
		private _router: Router,
		private _songService: SongService) {
	}
	
	ngOnInit() {
		this._songService.getSongs()
			.then(songs => this.songs = songs.slice(1, 5));
	}

	gotoDetail(song: Song) {
		let link = ['SongDetail', { id: song.id }];
		this._router.navigate(link);
	}
}
