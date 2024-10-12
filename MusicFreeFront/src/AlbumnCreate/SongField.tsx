import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";

interface SongFieldProps{
    song: SongInterface|undefined
    onChange: (song: SongInterface)=> void
}

export function SongField({song, onChange}:SongFieldProps){


function handleSubmit(){
    //проверять пуст ли файл если что отправлять ошибку
    //проверять другие штуки пустые ли
onChange({
    name: text_inputs.name!,
    index: text_inputs.index!,
    extra_authors: song?.extra_authors!,
    file: fileState!,
});
}
function handleFileChange(e: React.ChangeEvent<HTMLInputElement>){
setfileState(e.target.files![0]);
}
return(
<div>

<input onChange={(e:React.FormEvent<HTMLInputElement>)=>{setTextInputs({...text_inputs, name: e.currentTarget.value})}} type="text"/>
 <input type="text" pattern="[0-9]*" onChange={(e:React.FormEvent<HTMLInputElement>)=>{setTextInputs({...text_inputs, index: parseInt( e.currentTarget.value, 10)})}}/>
<AuthorSearch value={authorsState} onChange={(data: Array<AuthorData>)=>{setAuthors(data);}}/>

<button onClick={handleSubmit}>Submit</button>

</div>
);
}