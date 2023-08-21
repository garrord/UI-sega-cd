import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'game-component',
    templateUrl: 'game.component.html'
})

export class GameComponent {

    constructor(private activatedRoute: ActivatedRoute){}
    @Input() images: SafeUrl[] = [];
}