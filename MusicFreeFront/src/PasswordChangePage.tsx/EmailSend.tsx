import {useMutation} from "@tanstack/react-query"
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { EmailField } from "./EmailField";
import axios from 'axios';
import {useState} from "react";
import { urlmaker } from "../utils/urlmaker";
const func = async (data:string)=>( await axios.post( urlmaker.make(urlmaker.url,["auth", "change","password", data]) ))

export function EmailSend(){
    const [state, setState] = useState<"form"|"text">("form");
    const mutation = useMutation({mutationFn:func, onSuccess:()=>{setState("text")}});
    const {register, handleSubmit} = useForm({defaultValues: {email: ""}});
    
  function handleSub(data:{email: string}){
    console.log(data);
    mutation.mutate(data.email);
  }  
    return(<div>

    { state=="form" ?<div> <EmailField register={register}/>
<button onClick={handleSubmit(handleSub)}>Submit</button></div>: <div>
    <a>We sent email to your email adress!</a>
</div> 

    }

    </div> );
}