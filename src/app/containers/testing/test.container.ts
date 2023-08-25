import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ImageService } from "src/app/services/image.service";

@Component({
    selector: 'test-container',
    templateUrl: 'test.container.html'
})

export class TestContainer implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private imageService: ImageService,
        private sanitizer: DomSanitizer
    ){}

    @Input() content!:string;
    title!: string | null;
    idSubscription!: Subscription;
    imageSubscription!: Subscription;
    ids:number[] = [];
    images: SafeUrl[] = [];
    isComplete:boolean = false;

    ngOnInit(): void {
        this.title = this.activatedRoute.snapshot.paramMap.get('game');
        if (this.content == 'books'){
            this.books();
        }
        else if (this.content == 'contents'){
            this.contents();
        }
        else if (this.content == 'music'){
            this.music();
        }
    }

    ngOnDestroy(): void {
        this.idSubscription.unsubscribe();
        this.imageSubscription.unsubscribe();
    }

    books():void{
        this.idSubscription = this.imageService.getBookIds(this.title!).subscribe({
            next:(x: number[]) => this.ids = x,
            error: (x: string) => console.log(x),
            complete: () => {
                if (this.ids.length > 0){
                    this.getImages(this.ids, 'books')
                }
                else{
                    this.isComplete = true;
                }
            }
        })
    }

    contents():void{
        this.idSubscription = this.imageService.getContentIds(this.title!).subscribe({
            next:(x: number[]) => this.ids = x,
            error: (x: string) => console.log(x),
            complete: () => {
                if (this.ids.length > 0){
                    this.getImages(this.ids, 'contents')
                }
                else{
                    this.isComplete = true;
                }
            }
        })
    }

    music():void{
        this.idSubscription = this.imageService.getMusicIds(this.title!).subscribe({
            next: (x) => this.ids = x,
            error: (x) => console.log(x),
            complete: () => {
                if (this.ids.length > 0){
                    this.getImages(this.ids, 'music');
                }else{
                    this.isComplete = true;
                }
            }
        })
    }

    getImages(ids: number[], content:string){
        switch(content){
            case 'books' :
                ids.forEach(id => {
                    this.imageSubscription = this.imageService.getBookImage(id).subscribe({
                        next: (x: Blob) => { 
                            const objectUrl = URL.createObjectURL(x);
                            const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                            this.images.push(imageUrl);
                        },
                        error: (x) => console.log(x),
                        complete: () => this.isComplete = true
                    })
                });
            break;
            case 'music' :
                ids.forEach(id => {
                    this.imageSubscription = this.imageService.getMusicImage(id).subscribe({
                        next: (x: Blob) => { 
                            const objectUrl = URL.createObjectURL(x);
                            const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                            this.images.push(imageUrl);
                        },
                        error: (x) => console.log(x),
                        complete: () => this.isComplete = true
                    })
                });
            break;
            case 'contents' :
                ids.forEach(id => {
                    this.imageSubscription = this.imageService.getContentImage(id).subscribe({
                        next: (x: Blob) => { 
                            const objectUrl = URL.createObjectURL(x);
                            const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                            this.images.push(imageUrl);
                        },
                        error: (x) => console.log(x),
                        complete: () => this.isComplete = true
                    })
                });
            break;
        }
    }
}