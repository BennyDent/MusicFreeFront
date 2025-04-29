import { usePlaylistAdd } from "./usePlaylistAdd";
import { useContext } from "react";
import { three_dots_context } from "../SongComponent"; 
export function PlaylistName({name, }:{name: string,  }){
    const playlist_add = usePlaylistAdd();
   const {song_id} = useContext(three_dots_context);
    return(<div onClick={()=>{playlist_add(song_id);}}><a>{name}</a></div>);
}