import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { RegistrationInput } from "../utils/CustomComponents/RegistrationInput";



export function PasswordsField({register, watch}:{register:UseFormRegister<any>, watch: UseFormWatch<any>}){

    return(
        <div  style={{display:"flex", flexDirection:"column"}}>
            <RegistrationInput  {...register("password",{required:"Password is required!",minLength:{value:8, 
      message:"Too short! Need to be at least 8 characters long!"}, maxLength:{value:50, message: "Password too long!"},
      deps:'re_password'})}/>
      <RegistrationInput  {...register("re_password",{required:"Write password again!", validate:value=> 
      value===watch("password")||"Passwords don't match!"})}/>

        </div>
    );
}