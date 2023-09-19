export class MusicModel {
    id!:number;
    name!:string;
    year!:number;
    musicTracks!:MusicTrackModel[];
}

export class MusicTrackModel{
    songTitle!:string;
    trackNumber!:string;
    game!:string;
    isSegaCdRelated!:boolean;
}