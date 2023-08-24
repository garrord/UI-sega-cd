import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { GameService } from "src/app/services/game.service";
import { VideoGameDetailsModel } from "src/app/models/video-game-details.model";

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
        //this.title = encodeURI(t!);
        this.gameDetailsSubscription = this.gameService.getVideoGameDetails(this.title!).subscribe({
            next: (x) => this.videoGameDetails = x,
            error: (x) => console.log(x),
            complete: () => this.isComplete = true
        });
    }

    ngOnDestroy(): void{
        this.gameDetailsSubscription.unsubscribe();
    }

    backToList():void{
        this.router.navigate(['/games']);
    }
}