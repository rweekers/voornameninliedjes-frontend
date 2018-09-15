import { Injectable } from '@angular/core';
import { Song } from './song';
import { SONGS } from './mock-songs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }

  getSongs(): Observable<Song[]> {
    return of(SONGS);
  }
}
