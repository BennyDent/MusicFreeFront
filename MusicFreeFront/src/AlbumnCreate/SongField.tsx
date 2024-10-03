import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";

interface SongFieldProps{
    index: number
    onChange: (song: SongInterface)=> void
}

function SongField({index, onChange}:SongFieldProps){
const [text_inputs, setTextInputs] = useState<{name: string, index: number}>({name:"", index: index });
const [authors, setAuthors] = useState<Array<AuthorData>>([]); 
const [fileState, setfileState] = useState<File>();
function handleSubmit(){
    //проверять пуст ли файл если что отправлять ошибку
    //проверять другие штуки пустые ли
onChange({
    name: text_inputs.name,
    index: text_inputs.index,
    extra_authors: authors,
    file: fileState!
});
}
function handleFileChange(e: React.ChangeEvent<HTMLInputElement>){
setfileState(e.target.files![0]);
}
return(
<div>
<form onSubmit={handleSubmit}>
<input type="text"/>
<input type="text"/>
<AuthorSearch value={authors} onChange={(data: Array<AuthorData>)=>{setAuthors(data);}}/>

</form>

</div>
);
}