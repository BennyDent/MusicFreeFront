import { useForm, useFieldArray, UseFormRegister, Controller,   } from "react-hook-form";
import { SongData } from "../zustandStore/Store";
import { DeleteObject_Array } from "../utils/delete_function";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { urlmaker } from "../utils/urlmaker";
import React, { useState, ChangeEventHandler } from "react";
import axios, {AxiosResponse} from "axios";
import { config } from "../utils/AuthoriseHeader";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
function AddorDeleteSong({songData, setSongData, type}:{songData: string, setSongData: ()=>void, type: "add"|"delete"}){

return(<div >
{}
<button onClick={()=>{setSongData()}}>{type=="delete" ? "x": "+"}</button>
</div>)
}

function SongInput({AddSongArray}:{  AddSongArray: (song: string)=>void}){
    var queryCLient = useQueryClient();
    var [song_name, setSong_Name] = useState<string>("");
    const {data, status} = useQuery({queryKey:["playlist", "add", song_name], queryFn:async ()=>(await axios.get(urlmaker.make(urlmaker.url, ["","",song_name])).then((resp:AxiosResponse)=>(resp.data)))});
    
    if(status=="error"){
        return(<div></div>)
}

if(status=="pending"){
    return(<div></div>)
}

    return(
        <div>
            <div>
            <input value={song_name} onChange={(e:React.ChangeEvent<HTMLInputElement >)=>{setSong_Name(e.target.value!)}}/>
            
            <button onClick={()=>{queryCLient.invalidateQueries({type:"active", queryKey:["playlist", "add", song_name]})}}/>
            </div>
            {data.data.map((data:string, index:number)=>(<AddorDeleteSong key={index} type="add" setSongData={()=>{AddSongArray(data)}} songData={data}/>))}
        </div>
    );

}


function SongInputTemplate({songsArray, setSongsArray}:{songsArray: Array<string>, setSongsArray:(input: Array<string>)=>void}){


    return(
        <div>
{songsArray.map((song: string, index: number
)=>(< AddorDeleteSong type={"delete"} key={index} songData={song} setSongData={()=>{setSongsArray(DeleteObject_Array(song, songsArray,))}}/>))}
        <SongInput AddSongArray={(song: string)=>{setSongsArray([...songsArray, song])}}/>
        </div>

    )
}

interface PlaylistData{
name: string,
songs: Array<string>
}

export function CreatePlaylistTemplate({id, setClose}:{id: string, setClose: ()=>void}){
var array: Array<string> =[];
    if (id !==undefined ){
array.push(id);
} 
const {register, handleSubmit, } = useForm({defaultValues:{name:"", songs:array}});
const mutation = useMutation({mutationFn: async (data:PlaylistData)=>(await axios.post(urlmaker.make(urlmaker.url, ["playlist", "create_playlist"]),data, config )), onSuccess:()=>{}, onError:()=>{}});

    return(

   <form onSubmit={handleSubmit((data:PlaylistData )=>{mutation.mutate(data);})}> 
<DialogContent>
<input {...register("name",{required: true})} />
</DialogContent>
<DialogContent>
<Controller name="songs"  render={({ field: { onChange, onBlur, value, ref }})=>(<SongInputTemplate songsArray={value} setSongsArray={value}/>)}/>
</DialogContent>
<DialogActions>
<button type="submit">Submit</button>
<button onClick={()=>{setClose()}}> cancel</button>
</DialogActions>
</form> 


    );
}