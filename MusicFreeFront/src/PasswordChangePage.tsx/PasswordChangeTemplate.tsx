import {useMutation} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PasswordsField } from "../RegistrationPage/PasswordsField";
import { urlmaker } from "../utils/urlmaker";
import axios from "axios";
import { useSearch } from "@tanstack/react-router";

interface DataSend {
    password: string,
     token: string, email: string,
}

//добавить сообщения об ошибках
const func = async(data:DataSend)=>(await axios.post(urlmaker.make(urlmaker.url,["auth","change","password_submit"]), data));
export function PasswordSubmit({}){
    const params:{email: string, token: string} = useSearch({from:"/email_change"});
    const mutation = useMutation({mutationFn:func});
    const {register, watch, handleSubmit} = useForm({defaultValues: {password:"", re_password:""}});



    return(<div style={{justifyContent: "center", display:"flex",}} >
        <div style={{display:"flex", flexDirection:"column"  }}>
           <PasswordsField register={register} watch={watch}/>
            <button style={{marginLeft: "30%", marginRight: "30%", marginTop: "10px" }} onClick={
                handleSubmit((data:{password: string, re_password: string})=>{console.log(params.email); mutation.mutate({password: data.password, email:params.email, token: params.token})})}>Submit</button>
        </div></div>
    )
}