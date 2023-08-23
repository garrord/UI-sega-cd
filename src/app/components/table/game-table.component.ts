import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { VideoGameRetailModel } from "src/app/models/video-game-retail.model";
import { BookDialog } from "../dialogs/book.dialog.component";

@Component({
    selector: 'game-table-component',
    templateUrl: 'game-table.component.html',
    styleUrls:['game-table.component.scss']
})

export class GameTableComponent implements OnInit {

    constructor(
        private router: Router,
        private matDialog: MatDialog
    ){}

    @Input() games: VideoGameRetailModel[] = [];

    displayedColumns:string[] = [
        "title", 
        "year", 
        "publisher", 
        "arcadePort",
        "pcPort",
        "usConsoleExclusive",
        "regionalAvailability",
        "books",
        "music"
    ];
    dataSource = new MatTableDataSource();

    ngOnInit(): void {
        this.dataSource.data = this.games;
    }

    navigateToGame(game: string){
        this.router.navigate([`/${game}`])
    }

    openDialog():void{
        this.matDialog.open(BookDialog, {
            width: '30vw',
            height: '20vh'
        });
    }

    navigateToBooks():void{
        console.log("hit")
    }
}