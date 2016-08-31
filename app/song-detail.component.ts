import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Song} from './song';
import { SongService } from './song.service';

@Component({
  selector: 'my-song-detail',
  templateUrl: 'app/song-detail.component.html',
  styleUrls: ['app/song-detail.component.css']
})

export class SongDetailComponent {

	song: Song;

	constructor(
		private _songService: SongService,
		private _routeParams: RouteParams) {
	}

	ngOnInit() {
		let id = +this._routeParams.get('id');
		this._songService.getSong(id)
			.then(song => this.song = song);
	}

	goBack() {
		window.history.back();
	}
}
