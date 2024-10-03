import {useQuery,  TypedDocumentNode, AnyVariables, UseQueryState} from "urql";
import{ ContainerWrapper }from "../utils/ContainerWrapper";
import { useSearch } from "@tanstack/react-router";
import { Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {name, description} from "./ProfileTemplateStrings";
import {profilefn} from '../utils/GraqhQlFn';
import { ProfileSearch } from "../SearchsInterfaces/ProfileInterfaces";



interface propsProfile {
status: "name"|"description"|"age"|"city"|"country"|"hobbies"
value: string
}


interface Prop {
    status: "name"|"description"
    result: UseQueryState<any, {
        id: string;}>
}

export function ProfileComponent({status, value}:propsProfile){
          return (
              <ContainerWrapper>
           { status=="description"||status=="hobbies"?<a> {value}</a>:<h1>{value}</h1>   } 
            </ContainerWrapper>
             );
    
 }
    
    export function DescriptionComponent(props:{}){
        
        
        }
        
     
    
 //{ props.status=="h1" ? null: {...result.data}}
            // { props.status=="a" ? null: {...result.data}}
            
interface propfileProps  {
    result:UseQueryState<any, {id: string;}>,
    status:"name"|"description"
}

function ProfileFunction(props: propfileProps){

}