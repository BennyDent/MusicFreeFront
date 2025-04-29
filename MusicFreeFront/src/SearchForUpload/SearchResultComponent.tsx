import { ContainerWrapper } from "../utils/ContainerWrapper";
import {Author_Input} from "./Choose_AutorContext";
import {useContext} from "react";
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
export interface AuthorData{
    name?: string;
    id: string; 
   
}
interface AuthorProps{
    status: "choosen"|"unchoosen"
    name: string;
    Id: string;
    updateFn?:(m: AuthorData)=>void
}
 
export function SearchResultComponent({name, Id, status,  updateFn}:AuthorProps){
    var update:(m:AuthorData )=>void;
    if(updateFn==undefined){
       update = useContext(Author_Input); 
       
    }
    else{
        update= updateFn;
    }
    
    return(
        <Container>
            <Row>
                <Col xl={2}>
                {name}
                </Col>
                <Col xl={2}>
                {status=="choosen" ? <button  onClick={(e)=>{update({name, id: Id})}}> + </button>: <button onClick={(e)=>{update({name, id: Id})}}> - </button>}
                </Col>
            </Row>
        </Container>
        
    )
}