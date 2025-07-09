import { useSrcStore, SrcStore } from "../zustandStore/Store";
import { useRef, useState, useEffect} from "react";
import { LegacyRef } from "react";
import { ButtonComponent } from "./ButtonComponent";
import { SliderComponent } from "./PlayBar";
import { useBackForward } from "./useBackForward";
import { AudioSlider } from "./Audioslider";
import  { createPortal } from "react-dom";

export type repeat_status = "off"|"repeat"|"repeat_once"

export function PlayerComponent(){
const ref = useRef<HTMLAudioElement>(null);





const [repeat, setRepeat] = useState<repeat_status>("off");
const setRepeat_one = async()=>{
if(repeat=="repeat_once") await setRepeat("repeat");
};


const [index, setIndex] = useState<number>(0); 
const { src, setSong, playlist_type:{session_id}, playlist,}  = useSrcStore((store)=>( { 
     src:store.song?.src, setSong: store.setSong, playlist_type: store.playlist_type,  playlist: store.songs_list}));
const {forward} = useBackForward();
useEffect(()=>{ 
   if(ref.current != undefined){
    
    if(ref.current.currentTime==ref.current.duration){
if(repeat!="off"){ref.current.currentTime=0; setRepeat_one()} else forward();
   }else{
let new_index = index+(ref.current.duration/ref.current.currentTime);
if(Math.floor(new_index)>=100){
new_index = 100
}
setIndex(new_index);
    }}},[ref.current?.currentTime])


let node =document.querySelector('.{audio-slider}');

    return(
<div style={{display: "flex", flexDirection: "column"}}>

<audio ref={ref} src={""+src} style={{display:"none"}}/>
 <div>
    <ButtonComponent src={src} ref={ref}/>
</div>   
    <div style={{display: "flex", flexDirection: "row"}}>
<TimeComponent time={ref.current?.currentTime}/>
<SliderComponent value={index} setValue={setIndex}/>
<TimeComponent time={ref.current?.duration}/>
    </div>
   
{node !=null ? createPortal(<AudioSlider ref={ref} />, node ) : undefined }
</div>

    );
}




function TimeComponent({time}:{time?: number}){
let minutes = "--";
let seconds = "--";

if(time != undefined){
let result_minutes = Math.floor(time / 60);
if(result_minutes==0) minutes== "00"; else minutes = (result_minutes < 10 ? "0" : '') + result_minutes.toString();
let result_seconds = time % 60;
if(result_seconds==0) seconds== "00"; else seconds = (result_seconds < 10 ? "0" : '') + result_seconds.toString();
}

return(<a>{minutes+ ":"+ seconds}</a>);
}