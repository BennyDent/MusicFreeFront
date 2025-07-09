import { useSrcStore } from "../zustandStore/Store";
import { SongFindIndex } from "../PlayerElement/useBackForward";
import axios from "axios";
import { url_fn } from "../utils/urlmaker";
import { SongData } from "../utils/SongData";

export function useSetSong(){

 const {set, back_index, setBack_index, playlist, setSong, playlist_type:{  url_strings }, song, setPlaylist_type} = useSrcStore((store)=>({set: store.setSongs_list, 
   setPlaylist_type: store.setPlaylist_type, 
    setSong: store.setSong, song: store.song,
    playlist: store.songs_list, playlist_type: store.playlist_type, 
     back_index: store.back_index,
setBack_index: store.setBack_index,

 }));

const next = async (input: number)=>(await axios.get(url_fn([ input.toString()])))


async function SetSong(new_index: number|undefined,new_playlist?: Array<SongData>){
if(song ==undefined && new_playlist != undefined){

await set(new_playlist).then(()=>{if(new_index != undefined) setSong(playlist[new_index]);else setSong(playlist[0]);});

}
else{

    var index = SongFindIndex(playlist, song!);
    if(playlist.length-(new_index!+ index)< 5){
        await next(10-(playlist.length-new_index!+ index)).then((data)=>{ set([...playlist.slice(0, index+new_index!-1), ...data.data])})
    }
    await setSong(playlist[index+new_index!])
}

}
return SetSong;
}