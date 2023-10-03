export class MusicModel {
    id!:number;
    name!:string;
    year!:number;
    musicTracks!:MusicTrackModel[];
    isCompilation!:boolean;
}

export class MusicTrackModel{
    songTitle!:string;
    trackNumber!:string;
    game!:string;
    isSegaCdRelated!:boolean;
}