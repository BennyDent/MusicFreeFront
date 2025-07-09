import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { useSrcStore } from "../zustandStore/Store";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorList } from "../utils/AuthorsList";
export function SongInfo(){
const state = useSrcStore(state=> state.song);
if(state==undefined){return(<div></div>);}    
return(
    <div>
       <ContainerWrapper>{state.name}</ContainerWrapper>
       <ContainerWrapper><AuthorList main_author={state.main_author} extra_authors={state.extra_authors} /></ContainerWrapper>
    </div>
)
}