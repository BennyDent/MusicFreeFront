
import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";
import { CreatedSongs } from "./CreatedSongs";
import { SongField } from "./SongField";
interface SongFieldProps{
    value: Array<SongInterface>,
    onChange: (songs: Array<SongInterface>)=>void
}




export function SongFieldsArray({value, onChange}:SongFieldProps){

const [status, setStatus] = useState<{status:"create"|"edit", song?: SongInterface  }>({status: "create"});
function handleEdit(song: SongInterface){
  
    setStatus({status:"edit", song});}
const handleDictionary={
    edit: (song:SongInterface, )=>{
        var new_value = value;
        new_value.splice(song.index!, 1);   
        new_value.splice(song.index!, 0, song);
        onChange(new_value);
        setStatus({status: "create"});
           
},
create:(song: SongInterface)=>{
    var value_copy = value;
    value_copy.push(song);
    onChange(value_copy);}

}

    return(
        <div>
            <ContainerWrapper>
                {value.map((data: SongInterface)=>(<CreatedSongs song={data} onEdit={handleEdit}/>))}
            </ContainerWrapper>
            <ContainerWrapper>
                <SongField onChange={handleDictionary[status.status]} song={status?.song}/>
            </ContainerWrapper>
        </div>
    );
}