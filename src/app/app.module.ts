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

@NgModule({
  declarations: [
    AppComponent,
    GameContainer,
    GameComponent,
    GameTableContainer,
    GameTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
  ],
  providers: [
    ImageService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
