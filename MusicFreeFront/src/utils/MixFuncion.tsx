import { SongData } from "../zustandStore/Store";





export function MixFunction(list: SongData[], missing_song_index?: number){
let missing_song:SongData| undefined = undefined;
    if(missing_song_index!=undefined){
list =  list.slice(missing_song_index, missing_song_index++)
}
for(let i = 0; i < list.length; i++){
    var element = list[i];
    list = list.slice(i, i++);
    list.splice(Math.round(Math.random()*list.length), 0, element!);
}
if(missing_song!=undefined){
    list.splice(missing_song_index!, 0, missing_song);
}
return list;

}