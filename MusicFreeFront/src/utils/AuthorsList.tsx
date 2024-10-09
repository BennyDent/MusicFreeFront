import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";


export function AuthorList({data}:{data:Array<AuthorData>}){

if (data.length==1){
    return(
        <Container>
        <Row>
       <Col>
       <Link to={"/"} 
       params={{id: data[0].Id}}>{data[0].name}</Link> 
       </Col>
        </Row>
    </Container>
    )
}

    return(
        <Container>
            <Row>

                {data.map((array_element, index)=>{
                    if(index+1 != data.length ){
                        array_element.name += ","
                    }
                    return(
                        <Col>
                        <LinkToAuthor id={array_element.Id}>{array_element.name}</LinkToAuthor>
                        </Col>
                    );

                })}
                
            </Row>
        </Container>
    );
}



function LinkToAuthor({children, id}:PropsWithChildren<{id:string}>){

    return(
        <Link to={"/"} 
        params={{id: id}}>
            {children}
        </Link>
    );

}