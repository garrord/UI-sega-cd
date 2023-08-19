import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'game-component',
    templateUrl: 'game.component.html'
})

export class GameComponent{
    @Input() images: SafeUrl[] = [];
}