
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AlbumnSearch } from "../SearchForUpload/AlbumnSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { useMutation } from "@tanstack/react-query";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";

interface AlbumnSendInterface{
    name: string,
    author: Array<string>,
    songs: Array<SendSongInterface>
}

interface SendSongInterface{
name: string,
extra_authors: Array<string>,
index: number,
}

 interface SongUploadData{
        name: string,
        albumn: string,
        author: string
    }

 interface mistakeStatus{
    file?: "is_required"|"wrong_format",
    
    author?: "is_required",
 }

 
export function SongUploadTemplate(){
    const [mastate, setMastate]= useState<Array<AuthorData>|undefined>();
    //var file = new FileList()
    const [name, setnameState] = useState<string>("");    
    const [songs_state, setSongsState] = useState<Array<SongInterface>|undefined>();
const mutationSecondFunction = async (data: SendSongInterface)=>(await axios.post("https://localhost:7190/music/song_upload", data))
   
   const mutationAlbumnFirstFn = async (formData:FormData)=>(await axios.post("https://localhost:7190/music/albumn_upload",formData, {headers: {"Content-Type": 'multipart/form-data' }}).then(
    (response)=>(response.data)
   ));
   const mutationSecond = useMutation({mutationFn: mutationAlbumnFirstFn,});
  const mutationFirst = useMutation({mutationFn: mutationAlbumnFirstFn, onSuccess: (data)=>{
    var albu
    var formData = new FormData;
    mutationSecond.mutate(formData);
  } });
    
function handleSubmit(e:React.SyntheticEvent<HTMLFormElement>){
e.preventDefault();
let songs_array: Array<SendSongInterface>=[];
songs_state?.forEach((data)=>{
    var strings_array: Array<string> = [];
    data.extra_authors.forEach((data)=>{strings_array.push(data.Id)});
    songs_array.push({name: data.name, index: data.index, extra_authors: strings_array})});
var for_mutation: AlbumnSendInterface = {songs: songs_array, name: name, author:};

}


    return(<form onSubmit={handleSubmit}>
        <ContainerWrapper>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(setnameState(e.target.value))} type="text"/>
        </ContainerWrapper>
       
           <AuthorSearch value={mastate} onChange={(data: Array<AuthorData>)=>{setMastate(data);}} />
        <ContainerWrapper>
            {mistakesStatus.author=="is_required" &&  <ContainerWrapper> <a>{"Song author is required"} </a>  </ContainerWrapper>}
           
            <button  type="submit">submit</button>
       </ContainerWrapper>
    </form>)
}   