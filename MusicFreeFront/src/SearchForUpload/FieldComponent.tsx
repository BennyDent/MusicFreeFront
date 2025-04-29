import { TextField } from "@mui/material";
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";


interface FieldComponentProps{
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void,
    find: ()=>void
}

export function FieldComponent({value, onChange, find}:FieldComponentProps){



    return(
        <Container fluid>
        <Row>
        <Col xl={3}>
        <TextField value={value} onChange={onChange}/>
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