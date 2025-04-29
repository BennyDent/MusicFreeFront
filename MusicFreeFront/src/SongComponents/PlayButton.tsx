import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { useSrcStore } from "../zustandStore/Store";
import axios from "axios";
import { urlmaker } from "../utils/urlmaker";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SongData } from "../zustandStore/Store";

async function ReturnSongList(id: string, type:"albumn"|"author"): Promise<Array<SongData>|undefined> {

    return await axios.get(urlmaker.make(urlmaker.url, ["search","songs", type, id])).then((r)=>(r.data));
}

export function ButtonComponent({id, type }:{id: string, type: "albumn"|"author"}){
    const ref =  useSrcStore((state)=>state.ref);
    const setList = useSrcStore((state)=>state.setSongWithListenList);
    const [is_first, setIsfirst] = useState<"first"|"second">("first");
    const [state, setState] = useState<"play"|"pause">("play");
    function handlePlayButton(){
    setState("play");
    ref?.current.audio.current!.pause();
    
    }
    function handlePauseButton(){
        if(is_first=="first"){
            ReturnSongList(id, type).then((value:Array<SongData>|undefined)=>{ if(value?.length != 0 ){setIsfirst("second"); setState("pause");};  }).then((value)=>{ref?.current.audio.current!.play();});
        
        }else{
            setState("pause");
      ref?.current.audio.current!.play();
        }
          
    }
    if(state=="play"){
return(<button style={{position: "absolute",   bottom: "0", right:"0"}} onClick={handlePauseButton}>pl</button>);
    }else{
return(<button style={{position: "absolute", bottom: "0", right:"0", }} onClick={handlePlayButton}>pa </button>);
    }
   
}