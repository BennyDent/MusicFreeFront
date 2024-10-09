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
       <ContainerWrapper><AuthorList data={state.authors}/></ContainerWrapper>
    </div>
)
}