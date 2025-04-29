import { useSrcStore } from "../zustandStore/Store";
import { NameAndAuthor } from "./SongandAuthor";
import {SongData} from "../zustandStore/Store";
function SongListComponent({ song, index}:{song: SongData, index: number|undefined}){

     let songslist = useSrcStore((state)=>state.songs_list);
     
    let songsetter = useSrcStore((state)=>state.setSongWithListenList);
    let songs_setter = useSrcStore((state)=>state.setSong);
    let setIndex = useSrcStore((state)=>state.setCurrentIndex);

function handleClick(){
    
        setIndex(index!);
        
      
}
  

    return(<div>
       
<NameAndAuthor song_play={()=>{songs_setter(songslist[index!]);}} song={song}/>

    </div>);
}