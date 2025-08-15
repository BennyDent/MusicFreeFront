import { Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { PropsWithChildren } from "react";

export function ContainerWrapper(props: PropsWithChildren){

    return(
        <div style={{display: "flex", flexDirection:"row"}}>
      {props.children}          
              </div>  
    );
}


export function  ColumnWrapper(props: PropsWithChildren){

    return(<div style={{display: "flex", flexDirection:"column"}}>
      {props.children}          
              </div>  );
}