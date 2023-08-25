import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'retail-component',
    templateUrl: 'retail.component.html',
    styleUrls: ['retail.component.scss']
})

export class RetailComponent{

    @Input() frontCoverImage!: SafeUrl;
    @Input() backCoverImage!: SafeUrl;
}