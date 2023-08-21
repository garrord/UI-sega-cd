import { Injectable } from "@angular/core";
import { VideoGameRetailModel } from "../models/video-game-retail.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { VideoGameDetailsModel } from "../models/video-game-details.model";

@Injectable()

export class GameService{
    
    constructor(private http: HttpClient){}

    private baseUrl = 'https://localhost:7062/api/videogame';

    public getAllGames(): Observable<VideoGameRetailModel[]>{
        return this.http.get<VideoGameRetailModel[]>(`${this.baseUrl}/getAllGames`);
    }

    public getVideoGameDetails(name: string): Observable<VideoGameDetailsModel>{
        return this.http.get<VideoGameDetailsModel>(`${this.baseUrl}/getGameDetails/${name}`);
    }
}