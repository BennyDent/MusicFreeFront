import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";

interface SongFieldProps{
    name?: string,
    index?: number,
    authors: Array<AuthorData>,
    file?: File
    onChange: (song: SongInterface)=> void
}

export function SongField({index, name,  authors, file, onChange}:SongFieldProps){

const [text_inputs, setTextInputs] = useState<{name: string|undefined, index: number|undefined}>({name: name, index: index });
const [authorsState, setAuthors] = useState<Array<AuthorData>>(authors); 
const [fileState, setfileState] = useState<File|undefined>(file);
function handleSubmit(){
    //проверять пуст ли файл если что отправлять ошибку
    //проверять другие штуки пустые ли
onChange({
    name: text_inputs.name!,
    index: text_inputs.index!,
    extra_authors: authors,
    file: fileState!,
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