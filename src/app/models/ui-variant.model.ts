import { SafeUrl } from "@angular/platform-browser";

export class UIVariantModel{
    description?:string;
    variantTypeId!:number;
    game!:string;
    image!:SafeUrl;
    isLinked!:boolean;
}