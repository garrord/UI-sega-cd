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

    ngOnInit(): void {
        this.allGamesSubscription = this.gameService.getAllGames().subscribe({
            next: (x) => this.games = x,
            error: (x) => console.log(x),
            complete: () => this.isComplete = true
        });
    }

    ngOnDestroy(): void {
        this.allGamesSubscription.unsubscribe();
    }
}