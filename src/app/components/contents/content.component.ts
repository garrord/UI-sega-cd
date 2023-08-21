import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'content-component',
    templateUrl: 'content.component.html',
    styleUrls:['content.component.scss']
})

export class ContentComponent{
    @Input() images: SafeUrl[] = [];
}