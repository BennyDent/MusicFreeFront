import {Slider} from "@mui/material"
import React from "react"



export function AudioSlider({ref}:{ref: React.RefObject<HTMLAudioElement>}){


    return(
    
    <div style={{display:"flex", flexDirection:"row"}}>
    <img/>
    <Slider onChange={(event: Event, value: number|number[], activeThumb: number)=>{if(!Array.isArray(value)) if(ref.current!= undefined)ref.current.volume = value/100  }}/>
         </div>);
}