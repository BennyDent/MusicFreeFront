import axios from "axios";
import {useMutation } from "@tanstack/react-query";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {useForm} from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { urlmaker } from "../utils/urlmaker";
interface AuthorInput{
    name: string
}

interface MisakesInterface{
    file: ""|"Empty file input. File is required"|"Wrong file extension! Try jpeg, png file!",
   
}

const mutateFn = async (variables:AuthorInput)=>{
    return await axios.post("https://localhost:7190/music/musician_upload/", variables).then((e)=>(e.data));
}
const second_mutation_func = async (formData: FormData)=>(await axios.post(urlmaker.make(urlmaker.url,["music", "musician_img_upload"]), formData))
export function MusicianCreate(){
const [mistakes, setMistakes] = useState<MisakesInterface>({file: ""});
const [file, setFile] = useState<File|undefined>();
const {handleSubmit, register, setError, formState:{errors} }= useForm({defaultValues:{name: ""}});
const second_mutation= useMutation({mutationFn: second_mutation_func});
const {mutate} = useMutation({mutationFn: mutateFn, onError:(error)=>{
    console.log(error);

}, onSuccess:(data:{src: string})=>{
    var new_form_data = new FormData();
    new_form_data.append(data.src, file!)
   second_mutation.mutate(new_form_data);
}});
function handleSub(data: AuthorInput){
console.log(data);

if(file== undefined){
  setMistakes({...mistakes, file: "Empty file input. File is required"});
    return null;
}
var extension = file.name.split('.').pop();
if(extension=="png"||extension=="jpg"||extension==""){
   
    mutate(data);
}else{setMistakes({...mistakes, file:"Wrong file extension! Try jpeg, png file!"})}
//
}
return(<div >
<form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", marginTop: "5vh"}} onSubmit={handleSubmit(handleSub)}>
<h1>Name:</h1>
<input {...register("name", {required:"Name is required!"})} type="text"/>
{errors.name && <p style={{color: "red"}}>{errors.name.message}</p>}
<h1>Author Name:</h1>
<input style={{margin:"1vh"}} type="file" onChange={(event:ChangeEvent<HTMLInputElement>)=>{setFile(event.currentTarget.files![0])}} />
{mistakes.file !="" && <p style={{color: "red"}}>{mistakes.file} </p>}
<button type="submit">Submit </button></form>
</div>);
}