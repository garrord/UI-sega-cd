import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, catchError, map, throwError } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { GameService } from "../../services/game.service";
import { VideoGameDetailsModel } from "../../models/video-game-details.model";

@Component({
    selector: 'game-container',
    templateUrl: 'game.container.html'
})

export class GameContainer implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private gameService: GameService,
        private router: Router
    ){}

    isComplete: boolean = false;
    gameDetailsSubscription!: Subscription;
    videoGameDetails!: VideoGameDetailsModel;
    title!:string | null;

    ngOnInit(): void {
        this.title = this.activatedRoute.snapshot.paramMap.get('game');
        this.gameDetailsSubscription = this.gameService.getVideoGameDetails(this.title!).subscribe({
            next: (x) => this.videoGameDetails = x,
            error: (x) => {
                if (x === 404){
                    this.router.navigate(['/error-404']);
                }
            },
            complete: () => {
                console.log("completed!")
                this.isComplete = true
            }
        });
    }

    ngOnDestroy(): void{
        this.gameDetailsSubscription.unsubscribe();
    }

    backToList():void{
        this.router.navigate(['/games']);
    }
}