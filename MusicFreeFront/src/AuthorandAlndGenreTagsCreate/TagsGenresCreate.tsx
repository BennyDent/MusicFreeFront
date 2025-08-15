import { url_fn } from "../utils/urlmaker";
import axios, { AxiosResponse } from "axios";
import {useForm}  from "react-hook-form";
import { send_header } from "../utils/JsonHeader";
import { ComponentWithName, ErrorMessageComponent } from "../AlbumnCreate/AlbumnCreateTemplate";

interface TagsCreation{
    name: string
}

export function TagsGenresCreate({status}:{status: "tags"|"genres"}){

    const mutation_function = async (data:{is_tag: Boolean,name: string})=>(await  fetch(url_fn([status]), JSON.stringify(data), send_header))
const {register, handleSubmit, formState:{errors}, setError, getValues, reset} = useForm<TagsCreation>({defaultValues:{name: ""}})


async function handleSub(data: TagsCreation){
var is_tag = status=="genres" ? false: true;

await mutation_function({is_tag: is_tag, name: data.name}).then((resp: AxiosResponse)=>{if(resp.status==409) setError("name",
    {message:"This tag already creates!"}); else if(resp.status==500)setError("root", {message:"Somethimg goes wrong!"})})

}
    return(

        <div style={{display: "flex", flexDirection: "column", marginTop:"10%", marginBottom:"10%", justifyContent: "space-between", alignItems: "center",}}>
            <form onSubmit={handleSubmit(handleSub)}>
<ComponentWithName name="Name" form_name="name" errors={errors}>

    <input type="text" {...register("name", {required:"Name is required!"})}/>
</ComponentWithName>
            <ErrorMessageComponent name="root" errors={errors}/>

            <button type="submit"> Submit</button>
            </form>
        </div>
    );
}