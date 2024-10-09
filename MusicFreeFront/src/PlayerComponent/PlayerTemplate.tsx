
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { SongInfo } from "./SongInfo";



function PlayerTemplate(){
    return(
        <Container fluid>
            <Row>
                <Col></Col>
                <Col><SongInfo/></Col>
                <Col></Col>
            </Row>
        </Container>
    );
}