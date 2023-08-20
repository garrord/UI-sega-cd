import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ImageService } from "../services/image.service";
import { ActivatedRoute } from "@angular/router";
import { ImageContentEnum } from "../enums/image-content.enum";

@Component({
    selector: 'game-container-component',
    templateUrl: 'game.container.component.html'
})

export class GameContainerComponent implements OnInit{
    
    constructor(
        private imageService: ImageService,
        private activatedRoute: ActivatedRoute
    ){}

    bookIdsSubscription!: Subscription;
    content: number = ImageContentEnum.Books;
    ids: number[] = [];
    isCompleted:boolean = false;

    ngOnInit(): void {
        this.getIds();
    }

    getIds():void{
        let title: string | null = this.activatedRoute.snapshot.paramMap.get('game');
        this.bookIdsSubscription = this.imageService.getImageIds(title!, this.content).subscribe({
            next:(x: number[]) => this.ids = x,
            error: (x: string) => console.log(x),
            complete: () => {
                console.log("completed");
                this.isCompleted = true;
                // if (this.ids.length > 0){
                //     this.getImages(this.ids, this.content)
                // }
            }
        })
    }

    reload(){
        console.log("selected new tab");
        this.getIds();
    }

    ngOnDestroy(): void{
        this.bookIdsSubscription.unsubscribe();
        //this.bookImagesSubscription.unsubscribe();
    }
}