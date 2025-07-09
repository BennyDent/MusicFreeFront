import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";
import { HookReturn } from "./useSongField";
import { SearchField } from "../SearchForUpload/AuthorSearch";
interface SongFieldProps{
    name?: string,
    index?: number,
    extra_authors: Array<AuthorData>,
    file?: File,
    extra_tags: Array<AuthorData>,
    extra_genres: Array<AuthorData>,
    onChange: (song: SongInterface)=> void
}

export function SongField({name, index, extra_authors, file, onChange}:SongFieldProps){
    const inputFile = useRef<any>(null);
const [key, setKey] = useState("sss")
const [nameState, setnameState] = useState<string|undefined>(name);
const [indexState, setindexState] = useState<number|undefined>(index);
const [extra_authorsState, setAuthorsState] = useState<Array<AuthorData>>(extra_authors);
const [ fileState, setFileState] = useState<File|undefined>(file);
const [extra_tags, setExtra_tags] = useState<Array<AuthorData>>([]);
const [extra_genres, setExtra_genres] = useState<Array<AuthorData>>([]);
function handleSubmit(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    let is_ready: Boolean = false;


    //проверять пуст ли файл если что отправлять ошибку
    //проверять другие штуки пустые ли

onChange({
   

    name: nameState!,
    index: indexState!,
    extra_authors: extra_authorsState,
    file: fileState!,
});
}
useEffect(()=>{
    console.log(name);
    setnameState(name);},[name]);
useEffect(()=>{setindexState(index)}, [index]);
useEffect(()=>{setAuthorsState(extra_authors)}, [extra_authors]);
useEffect(()=>{
    console.log(16);
    if (file?.webkitRelativePath==""){
       if(inputFile.current){
        inputFile.current.value= "";
        console.log(inputFile.current.value, 14);

       }
        
    }
     setFileState(file)
   },[file]);


return(
<div>

<input value={nameState}  onChange={(e:React.FormEvent<HTMLInputElement>)=>{setnameState(e.currentTarget.value)}} type="text"/>
 <input type="text" pattern="[1-9]*" value={indexState} onChange={(e:React.FormEvent<HTMLInputElement>)=>{setindexState(parseInt(e.currentTarget.value, 10))}}/>
<SearchField urlArray={[]} choice="multiple" queryKey={"song_extra_authors"} value={extra_authors} onChange={(data: Array<AuthorData>|AuthorData|undefined)=>{if(Array.isArray(data))setAuthorsState(data);}}  />
<SearchField urlArray={[]} choice="multiple" queryKey={"song__extra_tags"}  value={extra_tags} 
onChange={()=>{(data: Array<AuthorData>|AuthorData|undefined)=>{if(Array.isArray(data))setExtra_tags(data);}}}/>
<SearchField urlArray={[]} choice="multiple" queryKey={"song__extra_genres"}  value={extra_genres} 
onChange={()=>{(data: Array<AuthorData>|AuthorData|undefined)=>{if(Array.isArray(data))setExtra_genres(data);}}}/>
<input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setFileState(e.target.files![0])}} ref={inputFile}/>
<button  type="button" onClick={handleSubmit}>Submit</button>

</div>
);
}