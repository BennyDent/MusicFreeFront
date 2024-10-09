import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { useSrcStore } from "../zustandStore/Store";
import { AuthorList } from "../utils/AuthorsList";
import React from "react";
interface AlbumnSongProps{
    id: string,
    name: string,
    authors: Array<AuthorData> ,
    filename: string,
    albumn: AuthorData
}
export function AlbumnSong({id, authors, name}:AlbumnSongProps){
const srcsetter = useSrcStore((state)=>state.setSrc);

const click: React.MouseEventHandler<HTMLElement> = ()=>{srcsetter(id)};
return(<div >
    <div onClick={click}  >
    <ContainerWrapper >{name}</ContainerWrapper></div>
    <Container fluid>
        <Row>

        </Row>
    </Container>
    <ContainerWrapper> <AuthorList data={authors}/></ContainerWrapper></div>
);

}