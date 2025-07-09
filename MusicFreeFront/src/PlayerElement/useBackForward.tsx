import axios from "axios";
import { SongData } from "../utils/SongData";
import { url_fn } from "../utils/urlmaker";
import { useSrcStore } from "../zustandStore/Store";
import { MixFunction } from "../utils/MixFuncion";
export function SongFindIndex(array: Array<SongData>, song: SongData): number {

const filterfn = (data: SongData)=>(data.id==song.id);
return array.findIndex(filterfn);
}

function return_push(array: any[], add: any){
array.push(add);
return array;
}

function transform_array(list: SongData[]){

    if(list.length> 10 ){
   list = list.slice(7);
    }
    return list;
}



export const make_request = async (url_string:string[], id: string, method: "post"|"get"|"patch", session_id?: string)=>(await axios[method](url_fn(return_push([...url_string, id,], session_id)))); 
export function useBackForward(setDisabled? :  React.Dispatch<React.SetStateAction<boolean>>){
  
    const {set, back_index, setBack_index, playlist, setSong, playlist_type:{status, url_strings }, song, setPlaylist_type, mix} = useSrcStore((store)=>({set: store.setSongs_list, 
   setPlaylist_type: store.setPlaylist_type, 
    setSong: store.setSong, song: store.song,
    playlist: store.songs_list, playlist_type: store.playlist_type, 
     back_index: store.back_index,
setBack_index: store.setBack_index,
  mix: store.mix}));
      var index = SongFindIndex(playlist, song!); 

   const next = async (length: "10"|"1")=>{await axios.get(url_fn(  [...url_strings,  length])) .then((data)=>{set([...transform_array(playlist), ...(status=="playlist"&&mix==true ? MixFunction(data.data.playlist): data.data.playlist)]); 
        if(data.data.session_id!= undefined){setPlaylist_type({status, url_strings, })}})} //add session id     

        async function  Forward(){


if(playlist.length>=index) if(status=="playlist")await setPlaylist_type({status:"radio", url_strings:[]}); await next("10");
if(status == "radio"&& index != 0 ){
  if(back_index ){if(back_index>= index&& playlist.length-index< 11){
    next("1");
if(back_index==index){
   setBack_index(undefined); 
}
  }}
}
    
    
await setSong(playlist[index+1])
}
    
async function Back(){
 if(index==0){
   
   await make_request(["back","history",status, playlist.length.toString()],song!.id, "get").then((data)=>{
    if(!data.data.Empty()){
        set([...data.data, ...playlist]);
     index= data.data.length;  
    }else{ if(setDisabled !=undefined)setDisabled(false)};
  
    
    })     
  

        }
    if(!back_index){
        setBack_index(index);
    }
await setSong(playlist[index-1]);
} 
  
  
   return { forward: Forward,
back: Back
} 
}