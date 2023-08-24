import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ImageService } from "../../services/image.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { ImageContentEnum } from "../../enums/image-content.enum";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'contents-container',
    templateUrl: 'contents.container.html'
})

export class ContentsContainer implements OnInit, OnDestroy {

    constructor(
        private imageService: ImageService,
        private sanitizer: DomSanitizer,
        private activatedRoute: ActivatedRoute
    ){}

    @Input() title!: string | null;
    images: SafeUrl[] = [];
    isComplete: boolean = false;
    ids: number[] = [];
    contentIdsSubscription!: Subscription;
    contentImagesSubscription!: Subscription;
    content: number = ImageContentEnum.Books;

    ngOnInit(): void {
        //let title: string | null = this.activatedRoute.snapshot.paramMap.get('game');
        this.contentIdsSubscription = this.imageService.getContentIds(this.title!).subscribe({
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
            this.contentImagesSubscription = this.imageService.getContentImage(id).subscribe({
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
        this.contentIdsSubscription.unsubscribe();
        this.contentImagesSubscription.unsubscribe();
    }
}