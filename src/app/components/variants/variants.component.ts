import { Component, Input } from "@angular/core";
import { VariantsModel } from "../../models/variant.model";

@Component({
    selector: 'variants-component',
    templateUrl: 'variants.component.html',
    styleUrls: ['variants.component.scss']
})

export class VariantsComponent {
    @Input() variants!: VariantsModel;
}