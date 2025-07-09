import {useState, useEffect} from "react";
import { IconButton } from "@mui/material";
import React, { RefObject } from "react";
import { repeat_status } from "./PlayerElement";

export function ButtonComponent({src, ref}:{src:string|undefined, ref: RefObject<HTMLAudioElement>}){

const [playButton, setplayButton] = useState<"play"|"pause">(src==undefined ? "play":"pause");

useEffect(()=>{
    if(playButton=="pause") ref.current?.play(); else ref.current?.pause()
},[playButton]);
    return(<IconButton onClick={()=>{setplayButton(playButton=="play" ? "pause":"play")}}>{<image />}</IconButton>);
}



export const mix = ({value, setValue}:{value: boolean, setValue:React.Dispatch<React.SetStateAction<boolean>> })=>{

    return(<IconButton onClick={()=>{setValue(!value)}}>{value==true ? "":""}</IconButton>);
}

export const share =  ({string, setRepeat}:{string:repeat_status, setRepeat:React.Dispatch<React.SetStateAction<repeat_status>> })=>{
function handleClick(){
    if(string=="off"){
        setRepeat("repeat");
    }else if(string=="repeat"){setRepeat("repeat_once")}else{
        setRepeat("off")
    }
}

return(<IconButton onClick={handleClick}></IconButton>);
}