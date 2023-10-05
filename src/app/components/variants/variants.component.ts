import { Component, Input } from "@angular/core";
import { UIVariantModel } from "src/app/models/ui-variant.model";

@Component({
    selector: 'variants-component',
    templateUrl: 'variants.component.html',
    styleUrls: ['variants.component.scss']
})

export class VariantsComponent {
    @Input() uiVariants!: UIVariantModel;

    ngOnInit(): void {
        this.uiVariants;
    }
}