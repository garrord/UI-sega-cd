import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'music-component',
    templateUrl: 'music.component.html',
    styleUrls: ['music.component.scss']
})

export class MusicComponent{
    @Input() images: SafeUrl[] = [];
}