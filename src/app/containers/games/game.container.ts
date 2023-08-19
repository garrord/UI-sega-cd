import { Component, OnDestroy, OnInit } from "@angular/core";
import { ImageService } from "../../services/image.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { ImageContentEnum } from "../../enums/image-content.enum";

@Component({
    selector: 'game-container',
    templateUrl: 'game.container.html'
})

export class GameContainer implements OnInit, OnDestroy {

    constructor(
        private imageService: ImageService,
        private sanitizer: DomSanitizer
    ){}

    images: SafeUrl[] = [];
    isComplete: boolean = false;
    ids: number[] = [];
    bookIdsSubscription!: Subscription;
    bookImagesSubscription!: Subscription;

    ngOnInit(): void {
        this.bookIdsSubscription = this.imageService.getImageIds("Vay", ImageContentEnum.books).subscribe({
            next:(x: number[]) => this.ids = x,
            error: (x: string) => console.log(x),
            complete: () => {
                this.getImages(this.ids, ImageContentEnum.books)
            }
        })
    }

    getImages(id: number[], content:number){
        id.forEach(id => {
            this.bookImagesSubscription = this.imageService.getImages(id, content).subscribe({
                next: (x: Blob) => { 
                    const objectUrl = URL.createObjectURL(x);
                    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                    this.images.push(imageUrl);
                },
                error: (x) => console.log(x),
                complete: () => this.isComplete = true
            })
        })
    }

    ngOnDestroy(): void{
        this.bookIdsSubscription.unsubscribe();
        this.bookImagesSubscription.unsubscribe();
    }
}