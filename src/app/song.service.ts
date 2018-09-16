import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from './song';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  // private songsUrl = 'api/songs';
  private songsUrl = 'https://api.voornameninliedjes.nl/song';

  constructor(
    private http: HttpClient
  ) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsUrl);
  }
}
