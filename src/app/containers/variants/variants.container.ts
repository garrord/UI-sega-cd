import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ImageService } from "../../services/image.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { UILinkedVariantModel, UIUnlinkedVariantModel, UIUnlinkedVariantsModel, UIVariantModel } from "../../models/ui-variant.model";
import { UnlinkedVariants, VariantsModel } from "src/app/models/variant.model";


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
    uiVariants: UIVariantModel = new UIVariantModel();

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
        //need to get linkedVariants
        let uiLinkedVariant = new UILinkedVariantModel; //this is the base model, holding both linked and unlinked games
        let uiLinkedVariants: UILinkedVariantModel[] = [];

        if (variants.linkedVariants?.length > 0) {
            variants.linkedVariants.forEach(x => {
                uiLinkedVariant.description = x.description;
                if (x.discVariantBase64) {
                    let imageData:string = 'data:image/jpeg;base64,' + x.discVariantBase64;
                    uiLinkedVariant.discVariantImage = this.sanitizer.bypassSecurityTrustUrl(imageData);
                }
                if (x.manualVariantBase64) {
                    let imageData:string = 'data:image/jpeg;base64,' + x.manualVariantBase64;
                    uiLinkedVariant.manualVariantImage = this.sanitizer.bypassSecurityTrustUrl(imageData);
                }
                if (x.frontBoxVariantBase64) {
                    let imageData:string = 'data:image/jpeg;base64,' + x.frontBoxVariantBase64;
                    uiLinkedVariant.frontBoxVariantImage = this.sanitizer.bypassSecurityTrustUrl(imageData);
                }
                if (x.backBoxVariantBase64) {
                    let imageData:string = 'data:image/jpeg;base64,' + x.backBoxVariantBase64;
                    uiLinkedVariant.backBoxVariantImage = this.sanitizer.bypassSecurityTrustUrl(imageData);
                }
                uiLinkedVariants.push(uiLinkedVariant);
            })

            this.uiVariants.uiLinkedVariantModel = uiLinkedVariants;
        }

        //need to get unlinkedVariants
        if (variants.unlinkedVariants.unlinkedVars.length > 0){
            let unlinkedVariants = new UIUnlinkedVariantsModel();
            unlinkedVariants.description = variants.unlinkedVariants.description;
            unlinkedVariants.unlinkedVariants = this.createUnlinkedVariants(variants.unlinkedVariants);
            this.uiVariants.uiUnlinkedVariantsModel = unlinkedVariants;
        }
    }

    createUnlinkedVariants(unlinkedVariants: UnlinkedVariants): UIUnlinkedVariantModel[] {
        let unlinkedVariantsArray: UIUnlinkedVariantModel[] = [];
        unlinkedVariants.unlinkedVars?.forEach(x => {
            let variant = new UIUnlinkedVariantModel();
            variant.variantTypeId = x.variantTypeId;
            let imageData:string = 'data:image/jpeg;base64,' + x.imageBase64
            variant.image = this.sanitizer.bypassSecurityTrustUrl(imageData);
            unlinkedVariantsArray.push(variant);
        })
        return unlinkedVariantsArray;
    }

    ngOnDestroy(): void {
        this.variantsSubscription.unsubscribe();
    }
}