import { useSrcStore } from "../zustandStore/Store";
import { IconButton } from "@mui/material";
import { MixFunction } from "../utils/MixFuncion";
import { useState, useEffect } from "react";
import { SongFindIndex } from "./NextButton";
import { SongData } from "../zustandStore/Store";
function MixButton(){

const {playlist, song, status, session_id, setPlaylist, mix, setmix} = useSrcStore((store)=>({playlist: store.songs_list, session_id: store.playlist_type.session_id,
     status: store.playlist_type.status,
    mix: store.mix,
    setmix: store.setMix,
    song: store.song,
setPlaylist: store.setSongs_list,
    }));

useEffect(()=>{if(song == undefined){setDisabled(true)}}, [song]);


const [disabled, setDisabled] = useState<boolean>(song!= undefined? false: true );

function handleClick(){
if(song!=undefined){
var index = SongFindIndex(playlist, song);
setPlaylist(MixFunction(playlist, index));
}
}

    return(<IconButton onClick={handleClick}></IconButton>);
}