import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ImageService } from "src/app/services/image.service";

@Component({
    selector: 'general-books-container',
    templateUrl: 'general-books.container.html'
})

export class GeneralBooksContainer implements OnInit {

    constructor(
        private imageService: ImageService,
        private sanitizer: DomSanitizer
    ){}

    ids:number[] = [];
    isComplete:boolean = false;
    images:SafeUrl[] = [];

    ngOnInit(): void {
        this.imageService.getGeneralBookIds().subscribe({
            next: (x) => this.ids = x,
            error: (x) => console.log(x),
            complete: () => {
                this.getGeneralBookImage(this.ids);
            }
        });
    }

    getGeneralBookImage(ids:number[]){
        ids.forEach(x => {
            this.imageService.getGeneralBookImage(x).subscribe({
                next: (x: Blob) => {
                    const objectUrl = URL.createObjectURL(x);
                    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                    this.images.push(imageUrl);
                },  
                error: (x) => console.log(x),
                complete: () => this.isComplete = true
            });
        })
    }
}