import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { SongListService } from '../shared/song-list/index';
import {Ng2PaginationModule} from 'ng2-pagination';

@NgModule({
  imports: [CommonModule, SharedModule, Ng2PaginationModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [SongListService]
})
export class HomeModule { }
