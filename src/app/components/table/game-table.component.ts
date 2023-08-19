import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { VideoGameRetailModel } from "src/app/models/video-game-retail.model";

@Component({
    selector: 'game-table-component',
    templateUrl: 'game-table.component.html'
})

export class GameTableComponent implements OnInit {

    @Input() games: VideoGameRetailModel[] = [];

    displayedColumns:string[] = [
        "title", 
        "year", 
        "publisher", 
        "arcadePort",
        "pcPort",
        "usConsoleExclusive",
        "regionalAvailability"
    ];
    dataSource = new MatTableDataSource();

    ngOnInit(): void {
        this.dataSource.data = this.games;
    }
}