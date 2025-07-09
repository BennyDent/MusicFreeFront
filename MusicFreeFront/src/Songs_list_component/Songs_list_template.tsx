import InfiniteScroll from "react-infinite-scroll-component";
import {useState} from "react";
import { useSrcStore } from "../zustandStore/Store";
import { SongComponent } from "../SongComponents/SongComponent";
import { SongFindIndex } from "../PlayerElement/useBackForward";
function Songs_list_template(){

const {song_list, song} = useSrcStore((state)=>({song_list: state.songs_list, song: state.song}));

if(song == undefined){
    return( 
        <div>
            <h1> Plays now:</h1>
           
            <h1> Plays next:</h1>
         
        </div> 
    );
}

const index = SongFindIndex(song_list, song);
    
let playlist = song_list.slice(index);


    return(
    <div>
            <h1> Plays now:</h1>
             <SongComponent status="song_order" song={song} index={0}/>
            <h1> Plays next:</h1>
        { playlist.slice(1).map((data, index)=>(<SongComponent status="song_order" song={data} index={index+ 1} />))}
        </div> 
    );
}