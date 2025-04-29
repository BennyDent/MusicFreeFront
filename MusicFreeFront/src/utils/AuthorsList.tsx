import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { useNavigate } from "@tanstack/react-router";

export function AuthorList({main_author, extra_authors}:{main_author: AuthorData, extra_authors: Array<AuthorData>}){

if (extra_authors==undefined){
    return(
        <div>
       <LinkToAuthor id={main_author.id!}>{main_author.name!}</LinkToAuthor>
       </div>
    )
}
var data: Array<AuthorData> = [main_author];
data.push(...extra_authors);
    return(
        <div>
        

                {data.map((array_element, index)=>{
                    if(index+1 != data.length ){
                        array_element.name += ","
                    }
                    return(
                        
                        <LinkToAuthor id={array_element.id}>{array_element.name}</LinkToAuthor>
                        
                    );

                })}
                
            </div>
    );
}



function LinkToAuthor({children, id}:PropsWithChildren<{id:string}>){
const navigate = useNavigate();
console.log(id);
    return(
       <a onClick={()=>{navigate({to:"/music_pages/author_page", search:{id: id} })}}>
        {children}
       </a>
    );

}