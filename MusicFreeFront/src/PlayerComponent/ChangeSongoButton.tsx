import { useSrcStore } from "../zustandStore/Store";
import {useState} from "react";

interface ChangeSongProp{
    status: "next"|"previous",
  
}

export function ChangesongButton({status}:ChangeSongProp){
//const { index, songs_list} = useSrcStore((state)=>({ index: state.current_index,songs_list: state.songs_list}));
const index = useSrcStore((state)=>(state.current_index));
const songs_list = useSrcStore((state)=>(state.songs_list));
const setIndex = useSrcStore((state)=>(state.setCurrentIndex));
const setSong = useSrcStore((state)=>(state.setSong));


const button_text= {
    next: ">",
    previous: "<"
}
const buttton_function={
    next:(index: number)=>{
      return index+1
    },
    previous:  (index: number)=>{ return index-1;},
}
function SetNewList(){
var is_can: boolean = true; 
let index_fn = buttton_function[status];
let new_index = index_fn(index);
 if(status=="next"){
if(new_index>songs_list.length){
   
        is_can = false;
    
} 

}else if(new_index <0){
    is_can=false
}

if(is_can==true){
    let newSong = songs_list[new_index]
    setSong(newSong);
setIndex(new_index);
}

}

    return(<div>
<button  onClick={()=>{
SetNewList();
}}>{button_text[status]}</button>
    </div>);
}