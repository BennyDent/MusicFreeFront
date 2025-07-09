import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import Button from '@mui/material/Button';
import {useContext, useEffect, useState, useRef, createContext} from "react";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { useSrcStore } from "../zustandStore/Store";
import { AuthorList } from "../utils/AuthorsList";
import { SongListcontext } from "../AlbumnPage/AlbumnPageContext";
import { SongData } from "../utils/SongData";
import React from "react";
import { SongFetchInterface } from "../AlbumnPage/AlbumnPage";
import {useMutation, } from "@tanstack/react-query";
import { urlmaker } from "../utils/urlmaker";
import { config } from "../utils/AuthoriseHeader";
import axios from "axios";
import { ImageComponent } from "../utils/ImageComponent";
import { NameAndAuthor } from "./NameandAuthor";
import { useMenuFunction } from "./useMenuFunctions";
import { ThreeDotComponent } from "./ThreeDotsButton";
import { ListenedMutationFn } from "./ListenedMutationFunc";
import { SongCustomDiv } from "./SongCustomDiv";
import { AddToLikeButton } from "./AddToLikeButton";
import { useSetSong } from "./useSongSet";


export type song_status = "albumn"|"song_order"|  "search"

interface AlbumnSongProps{
   
    song: SongData,
      index?: number|undefined,
    status: song_status
}

interface Three_Dots_Context{
  setStatic: ()=>void,
  song_id: string
}
export const three_dots_context = createContext<Three_Dots_Context>({}as Three_Dots_Context);





export function SongComponent({ status, song, index}:AlbumnSongProps){

const setSongs_list = useSrcStore((store)=>(store.setSongs_list));

const setSong = useSetSong();
const ref = useRef<HTMLDivElement>(null);
const [is_static, setStatic] = useState<boolean>(false);
const [hover, setHover] = useState<"hover"|"not_hover">("not_hover");
console.log(song.is_liked);

useEffect(()=>{
if(hover =='hover'){
  if(is_static == false){
    setHover('not_hover')
  }
}
},[is_static]);
const object_array = useMenuFunction({albumnId: song.albumn_id});


let songslist:Array<SongData>| undefined= undefined;

  if(status=="albumn") {
    songslist = useContext(SongListcontext);
    setSongs_list(songslist);
  } else if(status=="search"){
    setSongs_list([song]);
  }
  

 // {status=="search" ?  <ImageComponent  src={song.src!} type="song"/>:<div>{[index!, 1].reduce((a,b)=> a+b,0).toString()}</div> }


if(song==undefined){
    return <div></div>
}else{
  return(<SongCustomDiv hover={hover} ref={ref} onMouseOver={()=>{setHover("hover");
   
  }}  onMouseOut={()=>{if(is_static==false){{setHover("not_hover")}}; 
    }}>
    <three_dots_context.Provider value={{setStatic: ()=> {setStatic(!is_static)}, song_id: song.id}}>
   <div>
  
   </div>
   
<NameAndAuthor  song={song} song_play={()=>{setSong(index!, songslist)}}/>


 <AddToLikeButton hover={hover} is_like={song.is_liked} status={status} songId={song.id}/>
<ThreeDotComponent menuList={object_array} hover={hover}   /></three_dots_context.Provider >
 </SongCustomDiv>
);

}


}
