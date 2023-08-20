import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageService } from './services/image.service';
import { GameContainer } from './containers/games/game.container';
import { GameComponent } from './components/games/game.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameService } from './services/game.service';
import { GameTableContainer } from './containers/table/game-table.container';
import { GameTableComponent } from './components/table/game-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { BookComponent } from './components/books/book.component';
import { GameContainerComponent } from './containerComponents/game.container.component';
import { MusicContainer } from './containers/music/music.container';
import { MusicComponent } from './components/music/music.component';
import { BookContainer } from './containers/books/book.container';
import { RetailContainer } from './containers/retail/retail.container';
import { RetailComponent } from './components/retail/retail.component';

@NgModule({
  declarations: [
    AppComponent,
    GameContainer,
    GameComponent,
    GameTableContainer,
    GameTableComponent,
    BookComponent,
    GameContainerComponent,
    MusicContainer,
    MusicComponent,
    BookContainer,
    RetailContainer,
    RetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    RouterModule.forRoot([
      { path: 'games', component: GameTableContainer },
      { path: '', redirectTo: 'games', pathMatch: 'full' },
      { path:  ':game', component: GameContainer }
    ])
  ],
  providers: [
    ImageService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
