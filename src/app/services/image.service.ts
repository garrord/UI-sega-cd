import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ImageContentEnum } from "../enums/image-content.enum";
import { MusicModel } from "../models/music.model";
import { VariantsModel } from "../models/variant.model";

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

    public getMusicIds(title: string): Observable<MusicModel[]>{
        return this.http.get<MusicModel[]>(`${this.baseUrl}/getMusicIds/${title}`);
    }

    public getBookIds(title: string): Observable<number[]>{
        return this.http.get<number[]>(`${this.baseUrl}/getBookIds/${title}`);
    }

    public getBookImage(id: number):Observable<Blob>{
        return this.http.get(`${this.baseUrl}/getBookImage/${id}`, { responseType:'blob' });
    }

    public getMusicImage(id: number):Observable<Blob>{
        return this.http.get(`${this.baseUrl}/getMusicImage/${id}`, { responseType:'blob' });
    }

    public getRetailImage(name: string, isFront:boolean):Observable<Blob>{
        return this.http.get(`${this.baseUrl}/getRetailImage/${name}/${isFront ? "front" : "back"}`, { responseType:'blob' });
    }

    public getContentIds(name: string):Observable<number[]>{
        return this.http.get<number[]>(`${this.baseUrl}/getContentsIds/${name}`);
    }

    public getContentImage(id:number):Observable<Blob>{
        return this.http.get(`${this.baseUrl}/getContentImage/${id}`, { responseType:'blob' });
    }

    public getGeneralBookIds():Observable<number[]>{
        return this.http.get<number[]>(`${this.baseUrl}/getGeneralBookIds`);
    }

    public getGeneralBookImage(id:number):Observable<Blob>{
        return this.http.get(`${this.baseUrl}/getGeneralBookImage/${id}`, { responseType:'blob' });
    }

    public getVariantImages(name:string):Observable<VariantsModel>{
        return this.http.get<VariantsModel>(`${this.baseUrl}/getVariants/${name}`);
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `an error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message} ;`
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}