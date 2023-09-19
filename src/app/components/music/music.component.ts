import { Component, Input } from "@angular/core";
import { MusicImageModel } from "../../models/music-images.model";

@Component({
    selector: 'music-component',
    templateUrl: 'music.component.html',
    styleUrls: ['music.component.scss']
})

export class MusicComponent{
    @Input() musicImages: MusicImageModel[] = [];

    ngOnInit(){
        this.musicImages;
    }
}