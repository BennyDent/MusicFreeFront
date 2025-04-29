
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { SongInfo } from "./SongInfo";
import { SongPlayer } from "./SongPlayer";
import { ChangesongButton } from "./ChangeSongoButton";
import { ButtonsComponent } from "./ButtonsComponent";

 //<Container fluid>
   //         <Row>
     //           <Col></Col>
         //       <Col><SongInfo/></Col>
       //         <Col><SongPlayer/></Col>
           // </Row>
        //</Container>
export function PlayerTemplate(){
    return(
       <div style={{
        display: "flex",
        justifyContent: "space-between"}}>
        <div style={{minWidth: "50vh"}}><SongInfo/></div>
        <div><SongPlayer/></div>
        <div style={{minWidth: "30vh", margin: "5vh"}}><ButtonsComponent/></div>
       </div>
       
    );
}