
import { useNavigate } from "@tanstack/react-router";
import { ButtonComponent } from "./PlayButton";
import { ImageComponent } from "../utils/ImageComponent";
import { AuthorFetch } from "../utils/Authorfetch";

export function AuthorComponent({data, status}:{data: AuthorFetch, status: "search"|"reccomendation"}){
const navigate = useNavigate();
console.log(data.src);
    return(
        <div style={{display: "flex", flexDirection: "column", minHeight:"3vh",  width: "230px", height: "275px"}}>
        <div style={{ width: "auto", maxWidth: "200px", paddingTop:"15px", paddingLeft:"15px"}}>
            <ImageComponent type="author" src={data.src} buttonComponent={ <ButtonComponent  id={data.id} type="author" /> }/>
           
            </div>
           <a style={{textDecoration: "underline" ,height: "auto", width: "auto",maxWidth: "200px",paddingLeft:"15px" }} onClick={()=>{navigate({to:"/music_pages/albumn_page", search:{id: data.id}})}}> {data.name}</a>  
            <a style={{height: "auto", width: "auto", maxWidth: "200px", paddingLeft:"15px"}}> Исполнители</a>
        </div>
    );
}