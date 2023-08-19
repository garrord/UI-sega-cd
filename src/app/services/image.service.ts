import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ImageContentEnum } from "../enums/image-content.enum";

@Injectable()

export class ImageService{
    
    constructor(private http: HttpClient){}

    private baseUrl = 'https://localhost:7062/api/image';


    public getImages(id:number, content: ImageContentEnum):Observable<Blob>{
        return this.http.get(`${this.baseUrl}/getImages/${id}`, { responseType:'blob' });
    }

    public getImageIds(title: string, content: ImageContentEnum): Observable<number[]>{
        return this.http.get<number[]>(`${this.baseUrl}/getImageIds/${content}/${title}`);
    }
}