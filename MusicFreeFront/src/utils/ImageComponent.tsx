import axios from "axios";
import { ReactNode, useState } from "react";
import { urlmaker } from "./urlmaker";

export function ImageComponent({src,type,buttonComponent}:{src: string ,type: "author"|"albumn"|"song", buttonComponent?: ReactNode}){
const [imageState, setImageState] =useState<Blob>();
axios.get(urlmaker.url+"music/get_song/"+src, {responseType: 'blob', headers:{"Access-Control-Allow-Origin": "*"} } ).then((r)=>{setImageState(r.data)});

if(imageState==undefined){
    return <div></div>
}

if(type=="albumn"){

    return(
        <div style={{position:"relative", width: "auto", height: "auto", maxWidth: "200px"}} >
 <img style={{minHeight:"4vh", minWidth:"4vh", height: "500px", width:"500px", maxHeight: "200px", maxWidth:"200px" }} src={URL.createObjectURL(imageState!)}/>
 <div style={{position: "relative", width: "95%" }}>
           {buttonComponent}
           </div>  
        </div>
    );
}

if(type=="author"){
return <div style={{position:"relative", width: "auto", height: "auto", maxWidth: "200px"}}> <img  style={{ 
    borderTopLeftRadius: 
    "50% 50%", borderTopRightRadius: "50% 50%", borderBottomLeftRadius: "50% 50%", borderBottomRightRadius: "50% 50%",
    display: "block", objectFit: "cover", 
     minHeight:"4vh", minWidth:"4vh", height: "500px", width:"500px", maxHeight: "200px", maxWidth:"200px" }}  src={URL.createObjectURL(imageState!)}/>
    <div style={{position: "relative", width: "110%" }}>
            {buttonComponent}
           </div>
     </div>}

     if (type=="song"){
        return(
            <div style={{position:"relative", width: "auto", height: "auto", maxWidth:"40px"}}>
<img style={{ minHeight:"4vh", minWidth:"4vh", height: "40px", width:"40px", maxHeight: "40px", maxWidth:"40px",}}  src={URL.createObjectURL(imageState!)}/>
            </div>
        );
     }
}