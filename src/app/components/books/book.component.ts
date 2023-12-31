import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'book-component',
    templateUrl: 'book.component.html',
    styleUrls: ['book.component.scss']
})

export class BookComponent {
    @Input() images: SafeUrl[] = [];
}