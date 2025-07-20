
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { useMutation } from "@tanstack/react-query";
import React, {useState} from "react";
import axios, { AxiosResponse } from "axios";
import { SongInterface } from "./SongInterface";
import { SearchField } from "../SearchForUpload/AuthorSearch";
import { SongFieldsArray } from "./SongFieldsArray";
import { SongField } from "./SongField";
import { ErrorMessage } from "@hookform/error-message"
import * as dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm, ValidateResult } from "react-hook-form";
import { ChangeEvent } from "react";
const queryfn = async (authorname: string)=>(await axios.get("https://localhost:7190/music/find_author/"+authorname));
interface AlbumnSendInterface{
name: string,
    main_author?: string,
    extra_authors: Array<string>,
    songs: Array<SendSongInterface>,
    tags: Array<String>,
    genres: Array<String>,
    date: string
}

const controllers_rules= {required: true||"Choice is required!"};


interface SendSongInterface{
name: string,
main_author: string,
extra_authors: Array<string>,
index: number,
tags: Array<string>,
genres: Array<string>
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

interface CreateAlbumn{
    main_author: AuthorData|undefined,
    extra_authors: Array<AuthorData>|undefined,
    name: string,
    songs: Array<SongInterface>,
    cover_image: File|undefined,
    tags: Array<AuthorData>,
    genres: Array<AuthorData>,
    type: 0|1|2,
    release_date: Date
}

function validate(file:File|undefined): ValidateResult {
if(file==undefined){
return false||"Cover image is required!"
}
if(file.name=="png"||"jpeg"||"tiff"||"svg"){
    return true;
}else{
    return false||"Wrong format or cover image!"
}

}





 //{headers: {"Content-Type": 'multipart/form-data' }}
export function AlbumnUploadTemplate(){
const {register, control, handleSubmit, formState:{errors}, setError, getValues, reset} = useForm<CreateAlbumn>({defaultValues: {main_author: undefined, type: 0, name: "", 
    extra_authors: undefined, songs: [], cover_image: undefined, tags: undefined, genres: undefined, release_date: new Date() }});

    const [cover_image, setCover_image_] = useState<File>();
   function CreateFormData(data: any):FormData{
var formData = new FormData();
console.log(data);

data.forEach((element: ResultInterface) => {
    console.log(data);
    
   console.log("send")
    if(element.index==-1){
        formData.append(element.filename, getValues('cover_image')!);

    }
  /*  else{
    let needed_song:SongInterface = songs_state!.filter(a=> a.index==element.index)[0]!;
    if(needed_song == undefined){
        // mistake
    }

    formData.append(element.filename, needed_song.file!);
    
    }
*/

  
   });
     return formData;}

   

const mutationAlbumnFirstFn = async (data: AlbumnSendInterface)=>(await axios.post("https://localhost:7190/music/create_albumn/", data).then((r:AxiosResponse)=>{console.log(r); return r;}))
   const send =  async(data:AlbumnSendInterface)=>(await mutationAlbumnFirstFn(data).then((r)=>{mutationSecondFunction(CreateFormData(r.data)).catch((r=>(setError(r.data.field_name, {message: r.data.message}))))})  ) ;
   const mutationSecondFunction = async (formData:FormData)=>(await axios.post("https://localhost:7190/music/upload_albumn/",formData )
   .then((r:AxiosResponse)=>{console.log(r); if(r.status== 200){reset;}else if(r.status==500)setError(r.data.field_name, {message: r.data.message});}));
   const mutationSecond = useMutation({mutationFn: mutationSecondFunction, onSuccess:(data)=>{console.log(data, 222);}});
  const mutationFirst = useMutation({mutationFn: mutationAlbumnFirstFn, onSuccess: (data)=>{
 
  

 mutationSecond.mutate(CreateFormData(data));
   
  } });
   

  function ErrorMessage(){

  }


async function  handleSub(data:CreateAlbumn){
var date = dayjs(data.release_date).format('MMMM D, YYYY');
var authors_id: Array<string>;
let songs_array: Array<SendSongInterface>=[];
let tags_strings: Array<String> = data.tags.map((a)=>(a.id));
let genres_strings: Array<String> = data.genres.map((a)=>(a.id));
data.extra_authors?.forEach((data:AuthorData)=>{
    authors_id.push(data.id);
});
data.songs?.forEach((song_data)=>{
    
    var strings_array: Array<string> = [];
    
    data.extra_authors!.forEach((push_data)=>{strings_array.push(push_data.id)});
    songs_array.push({tags: song_data.tags.map(a=> a.id), genres: song_data.genres.map(a=> a.id), name: song_data.name!, index: song_data.index!, extra_authors: strings_array, main_author: data.main_author?.name! })});
var for_mutation: AlbumnSendInterface = {...data, tags: [...tags_strings],genres: data.genres.map((a)=>a.id),  songs:songs_array, main_author: data.main_author!.id, extra_authors: data.extra_authors!= undefined ? data.extra_authors.map((data:AuthorData)=>data.id!): [],};
console.log(for_mutation,1314424234);
//mutationFirst.mutate(for_mutation);
await send(for_mutation);
console.log(data.cover_image);
console.log(data.songs)
}
function Validate(value: Array<AuthorData>){
if(value.length> 4) return true; else return false;
}

    return(<form onSubmit={handleSubmit(handleSub)}>
        <ContainerWrapper>
        <input {...register("name",{required: true})} type="text"/>
        </ContainerWrapper>
       <ContainerWrapper>
        <Controller control={control} name={"main_author"} render={({ field: { onChange, value,  } })=>( <SearchField urlArray={[]} choice="single" queryKey={"main_author_albumn"} value={value!} onChange={onChange}  />)}/>
        
       </ContainerWrapper>
           <Controller control={control}rules={controllers_rules} name={"extra_authors"}
            render={({ field: { onChange,  value } })=>( <SearchField  choice={"multiple"} queryKey={"extra_authors_albumn"} value={value!} urlArray={[]}  onChange={onChange}
          /> )} />
       <ContainerWrapper>
        
        <ContainerWrapper>
            <Controller name="type" control={control} rules={controllers_rules} 
            render={({ field: { onChange,  value } })=>(
                
                <select value={value} onChange={onChange}>
                <option>single</option>
                <option value={0}>albumn</option>
                <option value={1}>Ep</option>
                <option value={2}>single</option>
                </select>
            )}/>
        </ContainerWrapper>


       <input {...register("cover_image",{validate:{ checkAvailability: validate}, required: true})}  style={{margin:"1vh"}} type="file"  />
      
       </ContainerWrapper>
        <ContainerWrapper>
            <Controller control={control} name={"songs"} render={({ field: { onChange,  value } })=>( <SongFieldsArray value={value} onChange={onChange}/> )} />
          
            </ContainerWrapper> 
        <ContainerWrapper>
        <h1>Tags:</h1>
       </ContainerWrapper>
       <ContainerWrapper>
            <Controller rules={{required: true, validate:Validate }} control={control}  name="tags"  render={({ field: { onChange,  value } })=>( 
            <SearchField choice="multiple" value={value} onChange={onChange}  queryKey="tags" urlArray={["music", "find_tags"]}/> )} />
          
       </ContainerWrapper>  

       <ContainerWrapper>
        <Controller rules={{required: true, validate: Validate}} control={control} name="genres"   render={({ field: { onChange,  value } })=>(
            <SearchField choice="multiple" value={value} onChange={onChange}  queryKey="genres" urlArray={["music", "find_genres"]}/>
        )}/>

       </ContainerWrapper>

<ContainerWrapper>
    <Controller  rules={{required: true}} name={"release_date"} render={({field:{value, onChange}})=>(
        <DatePicker value={value} onChange={onChange}/>
    )}/>
</ContainerWrapper>
            <button  type="submit">submit</button>
     
       
    </form>)
}   