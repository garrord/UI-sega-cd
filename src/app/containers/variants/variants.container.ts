import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ImageService } from "../../services/image.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { UIVariantModel } from "../../models/ui-variant.model";
import { VariantsModel } from "src/app/models/variant.model";


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
    isComplete:boolean = false;
    images:SafeUrl[] = [];
    picturesComplete:boolean = false;
    variants!:VariantsModel;
    //variants:VariantsModel = new VariantsModel();


    ngOnInit(): void {
        this.variantsSubscription = this.imageService.getVariantImages(this.title!).subscribe({
            next: (x) => {
                this.variants = x
            },
            error: (x) => console.log(x),
            complete: () => {
                this.displayImages(this.variants);
                this.isComplete = true;
            }
        })
    }

    displayImages(variants:VariantsModel):void {
        
        // variants.forEach(x => {
    //         let variant = new UIVariantModel();
    //         variant.description = x.description;
    //         variant.variantTypeId = x.variantTypeId;
    //         variant.game = x.game;
    //         variant.isLinked = x.isLinked;
    //         let imageData:string = 'data:image/jpeg;base64,' + x.byteArray;
    //         variant.image = this.sanitizer.bypassSecurityTrustUrl(imageData);
    //         if (x.isLinked){
    //             this.variants.linkedVariants.push(variant);
    //         }
    //         else{
    //             this.variants.unlinkedVariants.push(variant);
    //         }
        //})
    //     this.picturesComplete = true;
    }

    ngOnDestroy(): void {
        this.variantsSubscription.unsubscribe();
    }
}