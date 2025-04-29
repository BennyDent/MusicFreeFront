import react from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContentText, DialogContent} from '@mui/material';
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate, useRouteContext} from "@tanstack/react-router";
import { useForm, Controller, FormProvider} from 'react-hook-form';
import { urlmaker } from './utils/urlmaker.js';
import { Auth } from './ts_files/auth.js';


interface LoginSendData{
  email: string,
  password: string,
}

const mutationsFn = async (data:LoginSendData):Promise<{token: string,username: string, email: string}>=>(await axios.post(urlmaker.make(urlmaker.url, ["auth", "login"]),data).then((resp)=>(resp.data)));

function LoginComponent(){
  const context:Auth = useRouteContext({from: "/login"});
  const navigate = useNavigate({from:"/login"});
    const queryClient  = useQueryClient();
    //axios.defaults.withCredentials = true
    const {handleSubmit, reset, register, setError, formState:{errors, touchedFields},} = useForm({
     mode:'onSubmit',defaultValues:{
    email: "",
    password: "",
   }});
   //axios.defaults.headers.common['Content-Type'] = 'Empty'
   const  mutation = useMutation({
    mutationFn: mutationsFn,
    onError: (error, variables, context)=>{
    reset();},
  onSuccess: async (data:{token: string, username: string, email: string})=>{
   reset();
    console.log(data.token);
  
   console.log(context.state);
   Cookies.set('Auth', data.token);
   console.log(Cookies.get('Auth'));
   navigate({to:"/music_pages/main_page"})
}});
 
 
 
   function handleSub(data:LoginSendData){
   console.log(data);
   mutation.mutate(data);
   }
 
 
     return(
         <div style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly"}}>
         <form onSubmit={handleSubmit(handleSub)}>
     
      <h1 style={{fontSize:"20px"}}>Email</h1>
      <input  {...register("email",{required:"Login is required", maxLength:{value:20, message:"Too long!"}})}/>
      <h1 style={{fontSize:"20px"}}>Password</h1>
      <input   {...register("password",{required:"Password is required!",minLength:{value:8, 
      message:"Too short! Need to be at least 8 characters long!"}, maxLength:{value:50, message: "Password too long!"}})} />
      <div>
      {errors.password && (<a>{errors.password.message}</a>)}
      </div>
      <div> </div>
      <Button style={{marginLeft:"25%"}} type="submit">Submit</Button> 
       </form>
       </div>
       );}


export default LoginComponent;
