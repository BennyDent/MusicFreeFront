
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AlbumnSearch } from "../SearchForUpload/AlbumnSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { useMutation } from "@tanstack/react-query";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";
import { SearchField } from "../SearchForUpload/SearchField.";
import { SongFieldsArray } from "./SongFieldsArray";
import { SongField } from "./SongField";
const queryfn = async (authorname: string)=>(await axios.get("https://localhost:7190/music/find_author/"+authorname));
interface AlbumnSendInterface{
name: string,
    main_author?: string,
    authors: Array<string>,
    songs: Array<SendSongInterface>
}

interface SendSongInterface{
name: string,

main_author: string,
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


 interface ResultInterface {
    index: number,
    filename: string,
 }
 
export function AlbumnUploadTemplate(){
   
    const [main_author, setMainAuthor] = useState<AuthorData|undefined>();
    const [mastate, setMastate]= useState<Array<AuthorData>|undefined>();
    //var file = new FileList()
    const [name, setnameState] = useState<string>("");    
    const [songs_state, setSongsState] = useState<Array<SongInterface>>([]);
const mutationAlbumnFirstFn = async (data: AlbumnSendInterface)=>(await axios.post("https://localhost:7190/music/create_albumn", data))
   
   const mutationSecondFunction = async (formData:FormData)=>(await axios.post("https://localhost:7190/music/upload_albumn",formData, {headers: {"Content-Type": 'multipart/form-data' }}).then(
    (response)=>(response.data)
   ));
   const mutationSecond = useMutation({mutationFn: mutationSecondFunction,});
  const mutationFirst = useMutation({mutationFn: mutationAlbumnFirstFn, onSuccess: (data)=>{
   console.log(data);
    var formData = new FormData;
     [{filename: ",", index: 3}].forEach((element: ResultInterface) => {
        let needed_song:SongInterface = songs_state!.filter(a=> a.index==element.index)[0]!;
        if(needed_song == undefined){
            // mistake
        }
        formData.append(element.filename, needed_song!.file);
          mutationSecond.mutate(formData);
    });

   
  } });
   
function handleSubmit(e:React.SyntheticEvent<HTMLFormElement>){
e.preventDefault();
var authors_id: Array<string>;
let songs_array: Array<SendSongInterface>=[];
mastate?.forEach((data:AuthorData)=>{
    authors_id.push(data.Id);
});
songs_state?.forEach((data)=>{
    var strings_array: Array<string> = [];
    data.extra_authors!.forEach((data)=>{strings_array.push(data.Id)});
    songs_array.push({name: data.name!, index: data.index!, extra_authors: strings_array, main_author: main_author!.Id})});
var for_mutation: AlbumnSendInterface = {songs: songs_array, name: name, main_author: main_author?.Id, authors: authors_id!};
mutationFirst.mutate(for_mutation);

}


    return(<form onSubmit={handleSubmit}>
        <ContainerWrapper>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(setnameState(e.target.value))} type="text"/>
        </ContainerWrapper>
       <ContainerWrapper>
        <SearchField value={main_author!} onChange={(author: AuthorData)=>{setMainAuthor(main_author)}} queryFn={async (authorname: string)=>(await axios.get("https://localhost:7190/music/find_author/"+authorname))} />
       </ContainerWrapper>
           <AuthorSearch value={mastate!} onChange={(data: Array<AuthorData>)=>{setMastate(data);}} />
        <ContainerWrapper>
           <SongFieldsArray value={songs_state} onChange={(songs: Array<SongInterface>)=>{setSongsState(songs);}}/>
           
            <button  type="submit">submit</button>
       </ContainerWrapper>
    </form>)
}   