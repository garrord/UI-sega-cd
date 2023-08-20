import { Component, Input, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'book-component',
    templateUrl: 'book.component.html'
})

export class BookComponent {

    @Input() images: SafeUrl[] = [];

}