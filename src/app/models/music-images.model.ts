import { SafeUrl } from "@angular/platform-browser";
import { MusicModel } from "./music.model";

export class MusicImageModel {
    image!:SafeUrl;
    musicInfo!: MusicModel;
}