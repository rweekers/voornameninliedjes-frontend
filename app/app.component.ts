import { Component } from '@angular/core';
import { SongsComponent } from './songs.component';

@Component({
  selector: 'my-app',
  template: `<h1>Voornamen in liedjes</h1>
            <songs></songs>`,
  directives: [SongsComponent]
})
export class AppComponent { }
