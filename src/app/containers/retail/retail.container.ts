import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ImageService } from "src/app/services/image.service";

@Component({
    selector: 'retail-container',
    templateUrl: 'retail.container.html'
})

export class RetailContainer implements OnInit, OnDestroy{

    constructor(
        private imageService: ImageService,
        private activateRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ){}

    frontCoverImage!: SafeUrl;
    backCoverImage!: SafeUrl;
    isComplete: boolean = false;
    frontImageSubscription!: Subscription;
    backImageSubscription!: Subscription;
    title!:string | null;
    isAvailable: boolean = true;

    ngOnInit(): void {
        this.title = this.activateRoute.snapshot.paramMap.get('game');
        this.frontImageSubscription = this.imageService.getRetailImage(this.title!, true).subscribe({
            next: (x: Blob) => {
                if (x.size == 0){
                    this.isAvailable = false;
                }
                else {
                    const objectUrl = URL.createObjectURL(x);
                    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                    this.frontCoverImage = imageUrl;
                }
            },
            error: (x) => console.log(x),
            complete: () => {        
                if (this.isAvailable){
                    this.getBackCover();
                }
                else {
                    this.isComplete = true;
                }  
            }
        });
    }

    getBackCover():void{
        this.backImageSubscription = this.imageService.getRetailImage(this.title!, false).subscribe({
            next: (x) => {
                const objectUrl = URL.createObjectURL(x);
                const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                this.backCoverImage = imageUrl;
            },
            error: (x) => console.log(x),
            complete: () => {
                this.isComplete = true
            }
        });
    }

    ngOnDestroy(): void{
        if(this.frontImageSubscription){
            this.frontImageSubscription.unsubscribe();
        }
        if( this.backImageSubscription){
            this.backImageSubscription.unsubscribe();
        }
    }
}