import { SongData, useSrcStore } from "../zustandStore/Store";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { url_fn } from "../utils/urlmaker";
import { useState } from "react";

import { useBackForward} from "./useBackForward";
import React from "react";
interface PlaylistSet{
        playlist: SongData[];
        set: (input: Array<SongData>) => void;
    }



function ArrayFilter(array: Array<SongData>, type: "next"|"back"){

while(array.length >=20){
    array.shift();
}
return array;
}







export function NextButton({direction, ref, repeat, setRepeat}:{direction: "back"|"forward", ref:React.RefObject<HTMLAudioElement>, repeat: "off"|"repeat"|"repeat_once",
    setRepeat: ()=> Promise<void>,

}){
 

//const {type, playlist_set, set_Song} = useSrcStore((store)=>({type: store.playlist_type, playlist_set:{playlist: store.songs_list, set: store.setSongs_list},  set_Song: store.setSong}));
const {set, song, setSong, playlist, mix, setPlaylist_type}= useSrcStore((store)=>({set: store.setSongs_list, 
   setPlaylist_type: store.setPlaylist_type, 
    setSong: store.setSong, song: store.song,
    playlist: store.songs_list, playlist_type: store.playlist_type, 
  
  mix: store.mix
}));


 const [disabled, setDisabled] = useState<boolean>((song==undefined ? true: false))
const {forward, back} =useBackForward(setDisabled);  
   
async function  handleClick(){
    if(direction=="forward"){
if(repeat!= "off"){
    if(repeat=="repeat_once"){ await setRepeat()};
 if (ref.current != null) ref.current.currentTime = 0;
}else{
if(repeat!="off"){ if(ref.current != undefined) ref.current.currentTime ==0; await setRepeat() ; }else{
   
    forward();

}
}
}   else{
    if(ref.current != undefined){
    if(ref.current.currentTime != undefined){

       if(ref.current?.currentTime > 0) ref.current.currentTime = 0;else {

    
        back();

       }
      
       
       }
    }}
}


    return(<button disabled={disabled}><img src={direction}/></button>);
}