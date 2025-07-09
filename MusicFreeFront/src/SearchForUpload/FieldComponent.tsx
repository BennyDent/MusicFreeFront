import { TextField } from "@mui/material";
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Autocomplete} from "@mui/material";
import axios from "axios";
import { url_fn } from "../utils/urlmaker";
interface FieldComponentProps{
    value: string,
    onChange: (e: string)=>void,
    find: ()=>void
    status: "tags"|"genre"|"text"
}

export function FieldComponent({value, onChange, find, status}:FieldComponentProps){
    var options: string[]= [];
    if(status=="text"){
    axios.get(url_fn([status])).then((data)=>{options= data.data});
    }


    return(
        <Container fluid>
        <Row>
        <Col xl={3}>
        {status=="text" ? <TextField value={value} onChange={(e)=>{onChange(e.target.value)}}/>: <Autocomplete 
        
        renderInput={(params)=>(<TextField {...params}/>)}
        value={value} onChange={(e: React.SyntheticEvent<Element, Event>, value: string|null)=>{
            if(value!= null)onChange(value);}} options={options}/>}
        </Col>
        <Col xl={3}>
        <button type="button" onClick={find}>
            Find
        </button>
        </Col>
        </Row>
</Container>
    );
}



