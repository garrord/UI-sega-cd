import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ImageService } from "../../services/image.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { ImageContentEnum } from "../../enums/image-content.enum";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'book-container',
    templateUrl: 'book.container.html'
})

export class BookContainer implements OnInit, OnDestroy {

    constructor(
        private imageService: ImageService,
        private sanitizer: DomSanitizer,
        private activatedRoute: ActivatedRoute
    ){}

    @Input() title!: string | null;
    images: SafeUrl[] = [];
    isComplete: boolean = false;
    ids: number[] = [];
    bookIdsSubscription!: Subscription;
    bookImagesSubscription!: Subscription;
    content: number = ImageContentEnum.Books;

    ngOnInit(): void {
        this.bookIdsSubscription = this.imageService.getBookIds(this.title!).subscribe({
            next:(x: number[]) => this.ids = x,
            error: (x: string) => console.log(x),
            complete: () => {
                if (this.ids.length > 0){
                    this.getImages(this.ids, this.content)
                }
                else{
                    this.isComplete = true;
                }
            }
        })
    }

    getImages(ids: number[], content:number){
        ids.forEach(id => {
            this.bookImagesSubscription = this.imageService.getBookImage(id).subscribe({
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