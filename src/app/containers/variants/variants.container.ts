import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ImageService } from "../../services/image.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { VariantModel } from "../../models/variant.model";
import { VariantsModel } from "../../models/variants.model";
import { UIVariantModel } from "../../models/ui-variant.model";

@Component({
    selector: 'variants-container',
    templateUrl: 'variants.container.html'
})

export class VariantContainer implements OnInit, OnDestroy {

    constructor(
        private imageService: ImageService,
        private sanitizer: DomSanitizer
    ){}

    @Input() title!:string | null;
    variantsSubscription!:Subscription;
    //variants!:VariantsModel;
    isComplete:boolean = false;
    images:SafeUrl[] = [];
    picturesComplete:boolean = false;
    unsortedVariants:VariantModel[] = [];
    variants:VariantsModel = new VariantsModel();


    ngOnInit(): void {
        this.variantsSubscription = this.imageService.getVariantImages(this.title!).subscribe({
            next: (x) => {
                this.unsortedVariants = x
            },
            error: (x) => console.log(x),
            complete: () => {
                this.displayImages(this.unsortedVariants);
                this.isComplete = true;
            }
        })
    }

    displayImages(unsortedVariants:VariantModel[]):void {
        unsortedVariants.forEach(x => {
            let variant = new UIVariantModel();
            variant.description = x.description;
            variant.variantTypeId = x.variantTypeId;
            variant.game = x.game;
            variant.isLinked = x.isLinked;
            let imageData:string = 'data:image/jpeg;base64,' + x.byteArray;
            variant.image = this.sanitizer.bypassSecurityTrustUrl(imageData);
            if (x.isLinked){
                this.variants.linkedVariants.push(variant);
            }
            else{
                this.variants.unlinkedVariants.push(variant);
            }
            //model => list of linkedvariants list of unlinked variants
        })
        // variants.linkedVariants.forEach(x => {
        //     let imageData:string = 'data:image/jpeg;base64,' + x.byteArray;
        //     let sanitizedImageData: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageData);
        //     this.images.push(sanitizedImageData);
        // });
        // variants.discVariants.forEach(x => {
        //     let imageData:string = 'data:image/jpeg;base64,' + x.byteArray;
        //     let sanitizedImageData: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageData);
        //     this.images.push(sanitizedImageData);
        // });
        // variants.manualVariants.forEach(x => {
        //     let imageData = 'data:image/jpeg;base64,' + x.byteArray;
        //     let sanitizedImageData: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageData);
        //     this.images.push(sanitizedImageData);
        // });
        // variants.frontBoxVariants.forEach(x => {
        //     let imageData:string = 'data:image/jpeg;base64,' + x.byteArray;
        //     let sanitizedImageData: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageData);
        //     this.images.push(sanitizedImageData);
        // });
        // variants.backBoxVariants.forEach(x => {
        //     let imageData:string = 'data:image/jpeg;base64,' + x.byteArray;
        //     let sanitizedImageData: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageData);
        //     this.images.push(sanitizedImageData);
        // });
        this.picturesComplete = true;
    }

    ngOnDestroy(): void {
        this.variantsSubscription.unsubscribe();

    }
}