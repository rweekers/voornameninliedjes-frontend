import { Component } from '@angular/core';
import { SongsComponent } from './songs.component';
import { SongDataService } from './song-data.service';

@Component({
  selector: 'my-app',
  template: `<h1>Voornamen in liedjes</h1>
            <songs></songs>`,
  directives: [SongsComponent],
  providers: [SongDataService]
})
export class AppComponent { }
