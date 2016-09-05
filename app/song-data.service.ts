import { SONGS } from './mocks';
import { Injectable } from '@angular/core';

@Injectable()
export class SongDataService {
  getSongs() {
    return SONGS.splice(0,5);
  }
}
