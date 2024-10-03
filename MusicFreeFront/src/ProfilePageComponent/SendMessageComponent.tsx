import { useNavigate } from "@tanstack/react-router";
import { useSearch } from "@tanstack/react-router";
import { IconButton } from "@mui/material";
import { Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { ProfileSearch } from "../SearchsInterfaces/ProfileInterfaces";

interface Props{
id: string,
self: string
}
export function SendMessageComponent({self, id}:Props){
    const navigate = useNavigate({from:"/dialogue"});
    function handleClick(){
        navigate({to: "/dialogue", search: {self: self,dialogue_member: id }})
    }
    return(
       <button onClick={handleClick}> Send message</button>
    );
}