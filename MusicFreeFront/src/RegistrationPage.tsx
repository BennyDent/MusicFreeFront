import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router";
import { urlmaker } from "./utils/urlmaker";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "@mui/material";
interface RegistrationInterface{
email: string,
username: string,
password: string,
re_password: string,
}

const mutationsFn = async (data: RegistrationInterface)=>(axios.post(urlmaker.make(urlmaker.url, ["auth", "register"]), data ));
function RegistrationComponent(){
    const navigate = useNavigate();
   
    const {handleSubmit, reset, register,  formState:{errors,}, watch} = useForm({
     mode:'onSubmit',defaultValues:{
    email: "",
    username: "",
    password: "",
    re_password: "",
   }});
   const queryClient = useQueryClient();
   const  mutation = useMutation({
     mutationFn: mutationsFn,
    onError: (error, variables, context)=>{
    reset();},
  onSuccess: (data)=>{
     reset();
  }});
 
 
 
   function handleSub(data:RegistrationInterface){
   console.log(data);
   mutation.mutate(data);
   }
 
return(
    <form onSubmit={handleSubmit(handleSub)}>
 <Container className='center' fluid>
<Row><Col><h1>
    Registration
    </h1></Col></Row>
 <Row> <Col>Email</Col></Row>
 <Row> <Col> <input  {...register("email",{required:"Email is required", pattern:{value: /^\S+@\S+\.\S+$/,
       message:"Wrong format! Need email address!"},maxLength:{value:250, message:"Too long!"}})}/>
      </Col> </Row> 
      <Row> <Col>{errors.email && (<a>{errors.email.message}</a>)}</Col></Row> 
      <Row> <Col>Username</Col> </Row>
      <Row> <Col> <input  {...register("username",{required:"Username is required"})}/> </Col> </Row>
      <Row> <Col>
      {errors.username && (<a>{errors.username.message}</a>)}
      </Col> </Row>
      
      <Row> <Col>Password</Col> </Row>
      <Row> <Col> <input   {...register("password",{required:"Password is required!",minLength:{value:8, 
      message:"Too short! Need to be at least 8 characters long!"}, maxLength:{value:50, message: "Password too long!"},
      deps:'password_again'})} /></Col> </Row>
      <Row> <Col>Password again:</Col> </Row>
      <Row> <Col><input  {...register("password_again",{required:"Write password again!", validate:value=> 
      value===watch("password")||"Passwords don't match!"})}/></Col> </Row>
      <Row> <Col>
      {errors.password && (<a>{errors.password.message}</a>)}
      </Col> </Row>
      <Row> <Col>
      {errors.password_again && (<a>{errors.password_again.message}</a>)}
      </Col> </Row>
      <Row> <Col> <Button type='submit'>Submit</Button></Col></Row>
      </Container>
  </form>
);

}