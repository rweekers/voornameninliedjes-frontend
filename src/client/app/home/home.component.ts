import { Component, OnInit } from '@angular/core';
import { SongListService, NameListService, Song } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  songs: Song[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * SongListService.
   *
   * @param {SongListService} songListService - The injected SongListService.
   */
  constructor(public songListService: SongListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    // this.getNames();
    this.getSongs();
  }

  /**
   * Handle the nameListService observable
   */
  // getNames() {
  //   this.nameListService.get()
	// 	     .subscribe(
	// 	       names => this.names = names,
	// 	       error =>  this.errorMessage = <any>error
	// 	       );
  // }

  /**
   * Handle the songListService observable
   */
  getSongs() {
    this.songListService.get()
        .subscribe(
          songs => this.songs = songs,
          error => this.errorMessage = <any>error
        );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
