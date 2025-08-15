
import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";
import { CreatedSongs } from "./CreatedSongs";
import { SongField } from "./SongField";
import { useSongField } from "./useSongField";
import { useValidate } from "./AlbumnCreateTemplate"; 
interface SongFieldProps{
    value: Array<SongInterface>,
    onChange: (songs: Array<SongInterface>)=>void,
    parent_tags: Array<AuthorData>,
    parent_genres: Array<AuthorData>
}




export function SongFieldsArray({value, onChange, parent_genres, parent_tags}:SongFieldProps){

const file_validate = useValidate(["wav"]);

function handleEdit(song: SongInterface){
    setStatus("edit");
    setsongState(song);
    seteditedState(song.index!);
}
const [song, setsongState]= useState<SongInterface|undefined>();
const [edtedSong_index, seteditedState] = useState<number>(0);
const [status, setStatus] = useState<"create"|"edit">( "create");
const songState = useSongField();
const handleDictionary={
    edit: (new_song:SongInterface, )=>{
        
        var new_value = [ ...value.filter((part: SongInterface)=>part.index!=edtedSong_index), new_song];
        
        onChange(new_value);
        setStatus("create");
        seteditedState(0);
        setsongState({...song, ...new_song});
           
},
create:(song: SongInterface)=>{
    var new_value = [...value, song];
    onChange(new_value);
    var new_object = {extra_authors: []}
   setsongState({name: "", index: song.index!+1, extra_authors: [], file:new File([""], "filename"),tags:song.tags, genres: song.genres});
}


}
useEffect(()=>{console.log(song,222)},[song]);

const edit_button = {
    edited: (song: SongInterface)=>{ setStatus("edit");
        setsongState(song);
        seteditedState(song.index!);},
    undo: (song: SongInterface)=>{
        setStatus("create");
        setsongState({extra_authors: [], index: value.sort(sortFn)[value.length]?.index! +1, tags: song.tags, genres: song.genres});
        seteditedState(0);
    }
}

function sortFn(a: SongInterface, b: SongInterface){
if(a.index==b.index){
    return 0;
}
    if(a.index!<b.index!){
    return -1;
}
else{
    return +1;
}
}
  console.log(value, status);
    return(
        <div>
            <ContainerWrapper>
                {value.sort(sortFn).map((data: SongInterface, index)=>{
                    var status: "edited"|"undo" = "edited";
                    if(edtedSong_index== data.index){
                        status="undo"
                    }
                   return( <CreatedSongs status={status} key={index} song={data} onEdit={edit_button[status]}/>);})}
            </ContainerWrapper>
            <ContainerWrapper>
                <SongField onChange={handleDictionary[status]} {...song} parent_genres={parent_genres} parent_tags={parent_tags} />
                
            </ContainerWrapper>
        </div>
    );
}