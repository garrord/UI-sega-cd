import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { VideoGameRetailModel } from "../../models/video-game-retail.model";
import { GameService } from "../../services/game.service";

@Component({
    selector: 'game-table',
    templateUrl: 'game-table.container.html'
})

export class GameTableContainer implements OnInit, OnDestroy{

    constructor(private gameService: GameService){}

    games: VideoGameRetailModel[] = [];
    allGamesSubscription!: Subscription;
    isComplete: boolean = false;
    session:string = "games";

    ngOnInit(): void {
        // if (sessionStorage.getItem('games') == 'true'){
        //     console.log("session data!");
        // }
        if (sessionStorage['games']){
            console.log("session data! part 2");
            this.games = JSON.parse(sessionStorage['games']);
            this.isComplete = true;
        }
        else{
            this.allGamesSubscription = this.gameService.getAllGames().subscribe({
                next: (x) => this.games = x,
                error: (x) => console.log(x),
                complete: () => {
                    //let isCacheSupported = 'caches' in window; => need to look more into this; 
                    sessionStorage.setItem('games', JSON.stringify(this.games));
                    this.isComplete = true
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.allGamesSubscription?.unsubscribe();
    }
}