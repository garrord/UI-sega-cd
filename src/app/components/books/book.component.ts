import { Component, Input, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'book-component',
    templateUrl: 'book.component.html'
})

export class BookComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute){}

    @Input() images: SafeUrl[] = [];

    ngOnInit(): void {
        this.images;
        // let title = this.activatedRoute.snapshot.paramMap.get('game');
        // console.log(title);
    }
}