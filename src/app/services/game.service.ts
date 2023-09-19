import { Injectable } from "@angular/core";
import { VideoGameRetailModel } from "../models/video-game-retail.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { VideoGameDetailsModel } from "../models/video-game-details.model";

@Injectable()

export class GameService{
    
    constructor(private http: HttpClient){}

    private baseUrl = 'https://localhost:7062/api/videogame';

    public getAllGames(): Observable<VideoGameRetailModel[]>{
        return this.http.get<VideoGameRetailModel[]>(`${this.baseUrl}/getAllGames`);
    }

    public getVideoGameDetails(name: string): Observable<VideoGameDetailsModel>{
        return this.http.get<VideoGameDetailsModel>(`${this.baseUrl}/getGameDetails/${name}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) { //pertains to client side errors
            errorMessage = `an error occurred: ${err.error.message}`;
        } else { //pertaining to server side errors
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message} ;`
        }
        //console.error(errorMessage);
        return throwError(() => err.status );
    }
}


//////interceptors!!!!!!!!