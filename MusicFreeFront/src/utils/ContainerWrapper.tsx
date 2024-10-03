import { Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { PropsWithChildren } from "react";

export function ContainerWrapper(props: PropsWithChildren){

    return(
        <Container fluid>
            <Row>
                <Col>
      {props.children}          
                </Col>
            </Row>
        </Container>
    );
}