import axios from "axios";
import {useMutation } from "@tanstack/react-query";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {useForm} from "react-hook-form";

interface AuthorInput{
    name: string
}

const mutateFn = async (variables:AuthorInput)=>{
    return axios.post("https://localhost:7190/music/musician_upload/", variables).then((e)=>{console.log(e)});
}

export function MusicianCreate(){

const {handleSubmit, register, setError, formState:{errors} }= useForm({defaultValues:{name: ""}});
const {mutate} = useMutation({mutationFn: mutateFn, onError:(error)=>{
    console.log(error);
}});
function handleSub(data: AuthorInput){
console.log(data);
mutate(data);
}
return(<div>
<form onSubmit={handleSubmit(handleSub)}>
<input {...register("name")} type="text"/>
{errors.name && <p>{errors.name.message}</p>}
<button type="submit">Submit </button></form>
</div>);
}