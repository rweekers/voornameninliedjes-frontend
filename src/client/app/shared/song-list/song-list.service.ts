import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Song } from './song';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import {Config} from '../config/env.config';

/**
 * This class provides the SongList service with methods to read names and add names.
 */
@Injectable()
export class SongListService {

  private songsUrl = Config.API;

  /**
   * Creates a new SongListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(page: number): Observable<Song[]> {
    const perPage = 3;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    console.log('Environment ' + Config.ENV);

    return this.http.get(this.songsUrl)
                    .map(res => this.extractData(res, start, end))
                    .catch(this.handleError);
  }

  private extractData(res: Response, start: number, end: number) {
    let body = res.json();
    return body.data.slice(start, end) || { };
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

