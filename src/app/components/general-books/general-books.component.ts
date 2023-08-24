import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'general-books-component',
    templateUrl: 'general-books.component.html',
    styleUrls: ['general-books.component.scss']
})

export class GeneralBookComponent{
    @Input() images: SafeUrl[] = [];
}