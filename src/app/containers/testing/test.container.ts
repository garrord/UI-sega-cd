import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ImageService } from "../../services/image.service";
import { MusicModel } from "../../models/music.model";
import { MusicImageModel } from "../../models/music-images.model";

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
    bookImageSubscription!: Subscription;
    musicImageSubscription!:Subscription;
    musicImageService!:Subscription
    contentImageSubscription!:Subscription;
    ids:number[] = [];
    musicModel:MusicModel[] = [];
    images: SafeUrl[] = [];
    isComplete:boolean = false;
    musicImages:MusicImageModel[] = [];
    isMusicComplete:boolean = false;

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
        if (this.bookImageSubscription){
            this.bookImageSubscription.unsubscribe();
        }
        if (this.musicImageSubscription){
            this.musicImageSubscription.unsubscribe();
        }
        //this.imageSubscription.unsubscribe();
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
            next: (x: MusicModel[]) => this.musicModel = x,
            error: (x) => console.log(x),
            complete: () => {
                if (this.musicModel.length > 0){
                    //this.getImages(this.ids, 'music');
                    this.getMusicImages(this.musicModel);
                }else{
                    this.isComplete = true;
                }
            }
        })
    }

    getMusicImages(musicModels: MusicModel[]){
        musicModels.forEach(musicModel => {
            this.imageService.getMusicImage(musicModel.id).subscribe({
                next: (blob: Blob) => {
                    const objectUrl = URL.createObjectURL(blob);
                    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                    let mim = new MusicImageModel();
                    mim.image = imageUrl;
                    let mm = new MusicModel();
                    mm.id = musicModel.id;
                    mm.name = musicModel.name;
                    mm.year = musicModel.year;
                    mm.musicTracks = musicModel.musicTracks;
                    mim.musicInfo = mm;
                    this.musicImages.push(mim);

                    //this.images.push(imageUrl);
                },
                error: (x) => console.log(x),
                complete: () => this.isMusicComplete = true
            });
        })
    }

    getImages(ids: number[], content:string){
        switch(content){
            case 'books' :
                ids.forEach(id => {
                    this.bookImageSubscription = this.imageService.getBookImage(id).subscribe({
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
            // case 'music' :
            //     ids.forEach(id => {
            //         this.imageSubscription = this.imageService.getMusicImage(id).subscribe({
            //             next: (x: Blob) => { 
            //                 const objectUrl = URL.createObjectURL(x);
            //                 const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
            //                 this.images.push(imageUrl);
            //             },
            //             error: (x) => console.log(x),
            //             complete: () => this.isComplete = true
            //         })
            //     });
            // break;
            case 'contents' :
                ids.forEach(id => {
                    this.contentImageSubscription = this.imageService.getContentImage(id).subscribe({
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