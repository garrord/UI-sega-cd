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

    ngOnInit(): void {
        this.title = this.activateRoute.snapshot.paramMap.get('game');
        this.imageService.getRetailImage(this.title!, true).subscribe({
            next: (x) => {
                const objectUrl = URL.createObjectURL(x);
                const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                this.frontCoverImage = imageUrl;
            },
            error: (x) => console.log(x),
            complete: () => {          
                this.getBackCover();
            }
        });
      
    }

    getBackCover():void{
        this.imageService.getRetailImage(this.title!, false).subscribe({
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
        this.frontImageSubscription.unsubscribe();
        this.backImageSubscription.unsubscribe();
    }

}