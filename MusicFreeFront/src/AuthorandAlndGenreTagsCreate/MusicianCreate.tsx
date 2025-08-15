import axios, { AxiosResponse } from "axios";
import {useMutation } from "@tanstack/react-query";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {useForm} from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { url_fn } from "../utils/urlmaker";
import { send_header } from "../utils/JsonHeader";
import { ComponentWithName } from "../AlbumnCreate/AlbumnCreateTemplate";
import { ErrorMessageComponent } from "../AlbumnCreate/AlbumnCreateTemplate";
import { fetchPost, fectchFormDataPost } from "../utils/FetchMethods";
interface AuthorInput{
    name: string
}


interface MusicianCreate{
    name: string,
    file?: File,
}

interface MusicianInput{
    name: string
}



export function MusicianCreate(){
const mutateFn = async (data: {name: string})=>{
    return await fetchPost(["music", "create", "author"],data)
}
const second_mutation_func = async (formData: FormData)=>(await fectchFormDataPost(["music", "upload", "author"], formData));

const third_mutation_func = async (data: object)=>(await fetchPost(["music","upload", "id", "author"], data, ))


function CreateFormdata(file: File){
    var formdata = new FormData();
    formdata.append("cover",file);
    return formdata;
}

const {register, handleSubmit, formState:{errors}, setError, getValues, reset} = useForm<MusicianCreate>({defaultValues:{name: ""}})


 function  handleSub(data:MusicianCreate){

try{

     mutateFn({name: data.name}).then(async (resp: Response)=>{if(resp.status==200){var text = await resp.text(); return await second_mutation_func(CreateFormdata(data.file!))
        .then(async(res:Response )=>{if(res.status==200) {var data= res.text(); return await third_mutation_func({ [text]: data});}else throw "Something wrong!"}); 
      } else throw "Something Wrong!"}).then((r)=>{if(r.status==200)reset();});
}catch(e:any){
    setError("root", {message: e.message});
}
   

}

return(<div >
<form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", marginTop: "5vh"}} onSubmit={handleSubmit(handleSub)}>
<ComponentWithName name="Name" form_name="name" errors={errors}>
<input {...register("name", {required:"Name is required!"})} type="text"/>
</ComponentWithName>
<ComponentWithName name="Profile picture" form_name="file" errors={errors}>
    <input type="file" {...register("file", {required:"Profile picture is required!"})}/>
</ComponentWithName>
<ErrorMessageComponent name="root"  errors={errors}/>
<ContainerWrapper>
<button type="submit">Submit </button>
</ContainerWrapper>
</form>
</div>);
}