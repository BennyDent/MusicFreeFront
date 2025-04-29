import {useNavigate} from '@tanstack/react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { urlmaker } from '../utils/urlmaker';
import {  useQueryClient, useMutation} from '@tanstack/react-query';
import axios  from 'axios';
//
interface mutationInterface{
    email: string,
    code: string,
}
//axios.post(urlmaker.make(urlmaker.url, ["auth", "send_email_again", data]))
const mutationFunc = async(data:string)=>{axios.post(urlmaker.make(urlmaker.url, ["auth", "delete", data]))};
const secondmutationFunc = async(data:mutationInterface)=>{axios.post(urlmaker.make(urlmaker.url, ["auth", "confirm",]), data)};


function VeritificationComponent({state}:{state: string}){
const [errorMessage, seterrorMessage] = useState<string>("");
const [State, setState] = useState<string>("");

const navigate= useNavigate();
const queryClient = useQueryClient();
const mutation = useMutation({
    mutationFn: mutationFunc, 
});
const confirmMutation = useMutation({mutationFn: secondmutationFunc, onSuccess:()=>{handleHistory()}, onError:()=>{seterrorMessage("Wrong Code!")}});

function handleHistory(){
    navigate({to:"/music_pages"});
}

function handleSubmit(){
    if(State==""){
seterrorMessage("Code is required!");
return null;
    }
confirmMutation.mutate({email: state, code:State});
}

return(
    <Container fluid>
        <Row>
            <Col xl={{span:'auto'}}><h1>
            We sent a verifitivation letter to your email address!</h1>
            </Col>
        </Row>
        <Row>
            <Col xl={{span:'auto'}}>
            <a>
                Check your email, to find code to verify your account!
            </a>
            </Col>
        </Row>
        <Row>
            <Col>
            <input onChange={(e:React.FormEvent<HTMLInputElement>)=>{setState(e.currentTarget.value )}}/>
            </Col>
        </Row>
        <Row>
            <Col xl={{span: 1,}}>
            <Button onClick={()=>(mutation.mutate(state))}>
                Send email again!
            </Button>
            </Col>
            <Col xl={{ span: 1, offset: 9}}>
            <Button onClick={handleSubmit}> Accept </Button>
            </Col>
        </Row>
    </Container>
);
}

export default VeritificationComponent;