import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'retail-component',
    templateUrl: 'retail.component.html'
})

export class RetailComponent{
    @Input() frontCoverImage!: SafeUrl;
    @Input() backCoverImage!: SafeUrl;
}