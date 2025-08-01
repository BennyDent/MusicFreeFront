import axios, { AxiosResponse } from "axios";
import {useMutation } from "@tanstack/react-query";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {useForm} from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { url_fn } from "../utils/urlmaker";
import { send_header } from "../utils/JsonHeader";
import { ComponentWithName } from "../AlbumnCreate/AlbumnCreateTemplate";
import { ErrorMessageComponent } from "../AlbumnCreate/AlbumnCreateTemplate";
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
    return await axios.post(url_fn([]), JSON.stringify(data), send_header);
}
const second_mutation_func = async (formData: FormData)=>(await axios.post(url_fn([]) , formData));

const third_mutation_func = async (data: object)=>(await axios.post(url_fn([]), JSON.stringify(data), send_header))


function CreateFormdata(file: File){
    var formdata = new FormData();
    formdata.append("cover",file);
    return formdata;
}

const {register, handleSubmit, formState:{errors}, setError, getValues, reset} = useForm<MusicianCreate>({defaultValues:{name: ""}})


 function  handleSub(data:MusicianCreate){

try{

     mutateFn({name: data.name}).then(async (resp:AxiosResponse)=>{if(resp.status==200) return await second_mutation_func(CreateFormdata(data.file!))
        .then(async(res: AxiosResponse)=>{if(res.status==200) return await third_mutation_func({[resp.data]: res.data});else throw "Something wrong!"}); 
        else throw "Something Wrong!"}).then((r:AxiosResponse)=>{if(r.status==200)reset();});
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
    <input {...register("file", {required:"Profile picture is required!"})}/>
</ComponentWithName>
<ErrorMessageComponent name="root"  errors={errors}/>
<ContainerWrapper>
<button type="submit">Submit </button>
</ContainerWrapper>
</form>
</div>);
}