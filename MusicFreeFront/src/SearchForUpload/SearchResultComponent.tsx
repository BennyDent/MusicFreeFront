import { ContainerWrapper } from "../utils/ContainerWrapper";
import {useContext} from "react";
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { Author_Input } from "./Choose_AutorContext";
export interface AuthorData{
    name?: string;
    id: string; 
   
}
interface AuthorProps{
    status: "choosen"|"unchoosen"
    name?: string;
    id: string;
}
 const stringarray_to_authordata = (input: Array<string>|Array<AuthorData>)=>{
 if(typeof input[0]=="string"){
    var array = input.map(a=>({id: a}));
     return array;  
 }else{
 return input;
 }
    
 
 };
export function SearchResultComponent({name, id, status}:AuthorProps){
    const update = useContext(Author_Input)
    return(
        <Container>
            <Row>
                <Col xl={2}>
                {name ==undefined ? id: name}
                </Col>
                <Col xl={2}>
                <button  onClick={(e)=>{update({name, id}, status)}}>  {status=="choosen" ? "+": "-"}   </button>
                </Col>
            </Row>
        </Container>
        
    )
}