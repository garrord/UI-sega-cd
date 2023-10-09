import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { UIVariantModel } from "src/app/models/ui-variant.model";

@Component({
    selector: 'variants-component',
    templateUrl: 'variants.component.html',
    styleUrls: ['variants.component.scss']
})

export class VariantsComponent {
    @Input() uiVariants!: UIVariantModel;
    tempLinkedModel: TempModel[] = [];
    isComplete:boolean = false;

    ngOnInit(): void {
        let index = 0;
        this.uiVariants.uiLinkedVariantModel?.forEach(x => {
            let variant = new TempModel();
            variant.description = x.description;
            if (x.discVariantImage){
                variant.images.push(x.discVariantImage!);
            }
            if (x.manualVariantImage){
                variant.images.push(x.manualVariantImage!);
            }
            if (x.frontBoxVariantImage){
                variant.images.push(x.frontBoxVariantImage!);
            }
            if (x.backBoxVariantImage){
                variant.images.push(x.backBoxVariantImage!);
            }
            this.tempLinkedModel.push(variant);
            index++;
        });
        this.isComplete = true;
    }
}


//creating temp model to easily display the linked variants at time until
export class TempModel {
    description?:string;
    images: SafeUrl[] = [];
}