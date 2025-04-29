import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

export function EmailField({register}:{register: UseFormRegister<any>}){

    return(<input {...register("email", {required: "Email is required!", pattern:{value: /^\S+@\S+\.\S+$/,
       message:"Wrong format! Need email address!"}})}/>);
}