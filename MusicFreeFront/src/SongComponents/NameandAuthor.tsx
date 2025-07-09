import { SongData } from "../utils/SongData";
import { AuthorList } from "../utils/AuthorsList";
import { ListenedMutationFn } from "./ListenedMutationFunc";

export function NameAndAuthor({ song_play, song,}:{ song_play: ()=>void, song: SongData, song_index?: number}){

function handleClick(){
ListenedMutationFn(song.id)

song_play()
}

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
       <a onClick={handleClick}>{song?.name}</a>
        <AuthorList extra_authors={song.extra_authors} main_author={song.main_author}/>
       </div>
    );
}