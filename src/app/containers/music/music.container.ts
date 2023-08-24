import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ImageService } from "src/app/services/image.service";

@Component({
    selector: 'music-container',
    templateUrl: 'music.container.html'
})

export class MusicContainer implements OnInit, OnDestroy{
    
    constructor(
        private imageService: ImageService,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ){}

    @Input() title!:string | null;
    musicIdSubscription!: Subscription;
    musicImageSubscription!: Subscription;
    ids: number[] = [];
    images: SafeUrl[] = [];
    isComplete: boolean = false;

    ngOnInit(): void {
        //let title: string | null = this.activatedRoute.snapshot.paramMap.get('game');
        this.musicIdSubscription = this.imageService.getMusicIds(this.title!).subscribe({
            next: (x) => this.ids = x,
            error: (x) => console.log(x),
            complete: () => {
                if (this.ids.length > 0){
                    this.getImages(this.ids);
                }else{
                    this.isComplete = true;
                }
            }
        })
    }

    getImages(ids: number[]){
        ids.forEach(id => {
            this.musicImageSubscription = this.imageService.getMusicImage(id).subscribe({
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
        this.musicIdSubscription.unsubscribe();
        this.musicImageSubscription.unsubscribe();
    }
}