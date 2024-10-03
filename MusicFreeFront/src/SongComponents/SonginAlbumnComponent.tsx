import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { useSrcStore } from "../zustandStore/Store";
import React from "react";
interface AlbumnSongProps{
    id: string,
    name: string,
    author: string

}
function AlbumnSong({id, author, name}:AlbumnSongProps){
const srcsetter = useSrcStore((state)=>state.setSrc);

const click: React.MouseEventHandler<HTMLDivElement> = ()=>{srcsetter(id)};
return(<div onClick={click}>
    <ContainerWrapper >{name}</ContainerWrapper>
    <ContainerWrapper> {author}</ContainerWrapper></div>
);

}