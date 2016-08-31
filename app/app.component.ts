import { Component }       from 'angular2/core';
import { SongService }     from './song.service';
import { SongsComponent } from './songs.component';
import { SongDetailComponent } from './song-detail.component';
import { DashboardComponent } from './dashboard.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <nav>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['Songs']">Songs</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    SongService
  ]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/songs',
    name: 'Songs',
    component: SongsComponent
  },
  {
    path: '/detail/:id',
    name: 'SongDetail',
    component: SongDetailComponent
  }
])

export class AppComponent {
  title = 'Tour of Songs';
}
