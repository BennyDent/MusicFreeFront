import { SongComponent } from "./SongComponents/SongComponent";
import { useSrcStore } from "./zustandStore/Store";
import { SongData } from "./zustandStore/Store";

export function SongsOrder(){

const song_order = useSrcStore((state)=>state.song_order);
    return(<div>
        {song_order=="on" && <SongOrderMapper/>}</div>
    );
}

 function SongOrderMapper(){
   const array_index = useSrcStore((state)=>state.current_index);
const song_array = useSrcStore((state)=>state.songs_list);
let sub_array: Array<SongData> = [];
if(song_array.length>array_index+1){
let sub_array  = song_array.slice(array_index+1, song_array.length);
}

return(<div style={{display: "flex", flexDirection: "column", alignContent: "space-evenly"}}>
<h1>Plays now</h1>
<SongComponent song={song_array[array_index]!} index={array_index}  status="list"/>
<h1>Play next</h1>
{sub_array.length>0 && sub_array.map((data, index)=>(<SongComponent song={data} index={index+array_index} status="list"/>)) }
</div>); 
}