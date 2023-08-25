import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { VideoGameRetailModel } from "src/app/models/video-game-retail.model";
import { BookDialog } from "../dialogs/book.dialog.component";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: 'game-table-component',
    templateUrl: 'game-table.component.html',
    styleUrls:['game-table.component.scss']
})

export class GameTableComponent implements OnInit, AfterViewInit {

    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private cd: ChangeDetectorRef
    ){}

    @Input() games: VideoGameRetailModel[] = [];
    @ViewChild(MatSort) sort!: MatSort;

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

    ngAfterViewInit():void{
        this.dataSource.sort = this.sort;
        this.sort.disableClear = true;
        this.sort.sort({
            id: 'title', 
            start: 'asc',
            disableClear: true
        });
        this.cd.detectChanges();
    }

    navigateToGame(game: string){
        let encoded = encodeURIComponent(game);
        this.router.navigate([`/${encoded}`])
    }

    openDialog():void{
        this.matDialog.open(BookDialog, {
            width: '30vw',
            height: '20vh',
            autoFocus: 'false'
        });
    }
}