import {Injectable} from 'angular2/core';
import {SONGS} from './mock-songs';

@Injectable()
export class SongService {
	getSongs() {
		return Promise.resolve(SONGS);
	}
	getSong(id: number) {
		return Promise.resolve(SONGS).then(
			songs => songs.filter(song => song.id === id)[0]
		);
	}
}
