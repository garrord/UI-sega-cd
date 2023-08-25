import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'test-component',
    templateUrl: 'test.component.html',
    styleUrls: ['test.component.scss']
})

export class TestComponent{
    @Input() images: SafeUrl[] = [];
}