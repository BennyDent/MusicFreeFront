
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { useMutation } from "@tanstack/react-query";
import React, {useState, PropsWithChildren} from "react";
import axios, { AxiosResponse } from "axios";
import { SongInterface } from "./SongInterface";
import { SearchField } from "../SearchForUpload/AuthorSearch";
import { SongFieldsArray } from "./SongFieldsArray";
import { SongField } from "./SongField";
import { send_header } from "../utils/JsonHeader";
import { ErrorMessage } from "@hookform/error-message"
import * as dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, FieldError, FieldErrors, useForm, useWatch, ValidateResult } from "react-hook-form";
import { ChangeEvent } from "react";
import { url_fn } from "../utils/urlmaker";
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

export function useValidate(validate_strings: Array<string>){

const validate = (file: File|undefined)=>{
if(file==undefined){
return false||"Cover image is required!"
}
var false_index = 0
for (let validate_string of validate_strings){
if(validate_string== file.name){
    false_index +1;
}
}
if(false_index==validate_strings.length)return false; else return true;
}
return validate;

}



export function ComponentWithName({name, children, form_name, errors}: PropsWithChildren<{name: string,  form_name: string, errors: FieldErrors<any> }>){

return (
    <div>
        <ContainerWrapper>
            {name+":"}
        </ContainerWrapper>
        <ComponentWithErrorMessage name={form_name} errors={errors}>
        <ContainerWrapper>
            {children}
        </ContainerWrapper>
        </ComponentWithErrorMessage >
    
    </div>
)
}

function ComponentWithErrorMessage({name, errors, children}:PropsWithChildren<{name: string,errors:FieldErrors<any>}>){
return (<div>
    {children}
     <ErrorMessageComponent name={name} errors={errors}/>
    </div>);
}
 export function ErrorMessageComponent({name,  errors}:{name: string,  errors: FieldErrors<any>}){

    return <ErrorMessage name={name} errors={errors} render={({message, messages}:{ message: string | React.ReactElement, messages?: Object})=> (messages ?
          Object.entries(messages).map(([type, message]) => (
           <ContainerWrapper><ErrorText key={type}>{message}</ErrorText></ContainerWrapper> 
    )):  <ContainerWrapper><ErrorText>{message}</ErrorText></ContainerWrapper>  )}/>;
  }



const ErrorText = ({children}:PropsWithChildren)=>(<p style={{color: "red"}}>{children}</p>)

 //{headers: {"Content-Type": 'multipart/form-data' }}
export function AlbumnUploadTemplate(){
     var validate_cover = useValidate(["jpg","svg","jpeg"]);


    const {register, control, handleSubmit, formState:{errors}, setError, getValues, reset} = useForm<CreateAlbumn>({defaultValues: {main_author: undefined, type: 0, name: "", 
    extra_authors: undefined, songs: [], cover_image: undefined, tags: undefined, genres: undefined, release_date: new Date() }});
const tags_watch = useWatch({name:"tags"});
const genres_watch = useWatch({name: "genres"});
    const [general_error, setGeneral_error] = useState<string>("");
   function CreateFormData(data: CreateAlbumn):FormData{
var formData = new FormData();
console.log(data);

formData.append("albumn", data.cover_image!);
data.songs.forEach((element:SongInterface, index:number)=>{formData.append(index.toString(), element.file!)})
  /*  else{
    let needed_song:SongInterface = songs_state!.filter(a=> a.index==element.index)[0]!;
    if(needed_song == undefined){        // mistake
    }

    formData.append(element.filename, needed_song.file!);
    
    }
*/

  
   
     return formData;}

   interface IdResult{ 
    albumn_image: string,
    songs: Array<string>
     }
interface for_id_set{
    albumn_cover: object,
    songs: Array<object>
}
 interface ids{
        albumn: string,
        songs: string[]
     }

     function ReturnIds(data: IdResult, ids: ids ){
    var songs:Array<object> = data.songs.map((element: string, index: number)=>{ var name = ids.songs[0]; return {[name!]: element}});
    return {albumn_cover: {[ids.albumn]: data.albumn_image }, songs: songs}

     }

     const return_to_throw = (resp: AxiosResponse)=>{
        if(resp.status== 500){return "500"} else{
            return resp.data.message;
        }  }
    //сделать потом
const mutationAlbumnFirstFn = async (data: AlbumnSendInterface)=>(await axios.post("https://localhost:7190/music/create_albumn/", JSON.stringify(data),send_header));

   
   const mutationSecondFunction = async (formData:FormData)=>(await axios.post("https://localhost:7190/music/upload_albumn/", formData).then(
    (resp:AxiosResponse)=>( resp.data)));
   const mutationThirdFunction = async (data:for_id_set)=>(await axios.post(url_fn([]),JSON.stringify(data),send_header))


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
var for_mutation: AlbumnSendInterface = {...data, date: date, tags: [...tags_strings],genres: data.genres.map((a)=>a.id),  songs:songs_array, main_author: data.main_author!.id, extra_authors: data.extra_authors!= undefined ? data.extra_authors.map((data:AuthorData)=>data.id!): [],};
console.log(for_mutation,1314424234);
//mutationFirst.mutate(for_mutation);
var id_result: ids;
try{
await mutationAlbumnFirstFn(for_mutation).then(async (r:AxiosResponse)=> {if(r.status==200) return await mutationSecondFunction(CreateFormData(data))
    .then(async (resp: AxiosResponse)=>{if(resp.status==200)return await mutationThirdFunction(ReturnIds(resp.data,r.data));else throw "Something goes wrong!"});
    else throw "Something goes wrong"}).then( ()=>{reset;})


}catch(e:any){
setError("root", {message: e.message});
}

}
function Validate(value: Array<AuthorData>){
if(value.length> 4) return true; else return false;
}

    return(<form onSubmit={handleSubmit(handleSub)}>
       <ComponentWithName name="Name" errors={errors} form_name="name">
        <input {...register("name",{required: true})} type="text"/>
       </ComponentWithName> 
       <ComponentWithName  name="Author" errors={errors} form_name="main_author">
        <Controller control={control} name={"main_author"} render={({ field: { onChange, value,  } })=>( <SearchField urlArray={[]} choice="single" queryKey={"main_author_albumn"} value={value!} onChange={onChange}  />)}/>
        </ComponentWithName>
     <ComponentWithName name="Extra authors" errors={errors} form_name="extra_authors">
           <Controller control={control}rules={controllers_rules} name={"extra_authors"}
            render={({ field: { onChange,  value } })=>( <SearchField  choice={"multiple"} queryKey={"extra_authors_albumn"} value={value!} urlArray={[]}  onChange={onChange}
          /> )} />
      </ComponentWithName>
      
        
       <ComponentWithName name="Albumn type" errors={errors} form_name="type">
            <Controller name="type" control={control} rules={controllers_rules} 
            render={({ field: { onChange,  value } })=>(
                
                <select value={value} onChange={onChange}>
                <option>single</option>
                <option value={0}>albumn</option>
                <option value={1}>Ep</option>
                <option value={2}>single</option>
                </select>
            )}/>
        </ComponentWithName>

         <ComponentWithName name="Cover image" errors={errors} form_name="cover_image">      
       <input {...register("cover_image",{validate:{ checkAvailability: validate_cover}, required: true})}  style={{margin:"1vh"}} type="file"  />
      </ComponentWithName> 
   
      
        <ComponentWithName name="Songs"errors={errors} form_name="songs" >
            <Controller control={control} name={"songs"} render={({ field: { onChange,  value } })=>( <SongFieldsArray
             parent_genres={genres_watch} parent_tags={tags_watch} value={value} onChange={onChange}/> )} />
          
            </ComponentWithName> 
        <ComponentWithName errors={errors} form_name="tags"name={"Tags"}>
       
       
            <Controller rules={{required: true, validate:Validate }} control={control}  name="tags"  render={({ field: { onChange,  value } })=>( 
            <SearchField choice="multiple" value={value} onChange={onChange}  queryKey="tags" urlArray={["music", "find_tags"]}/> )} />
          
       </ComponentWithName>

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
<ErrorMessageComponent name="root"  errors={errors}/>
<ContainerWrapper>
            <button  type="submit">submit</button>
     </ContainerWrapper>
       
    </form>)
}   