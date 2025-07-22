import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { useSrcStore } from "../zustandStore/Store";
import axios from "axios";
import { urlmaker } from "../utils/urlmaker";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SongData } from "../utils/SongData";
import { ButtonComponent } from "./PlayButton";
import { ImageComponent } from "../utils/ImageComponent";
import { AuthorList } from "../utils/AuthorsList";
import { ListenedMutationFn } from "./ListenedMutationFunc";
import { AlbumnFetch } from "../utils/AlbumnFetch";
export function AlbumnComponent({data, status }:{data: AlbumnFetch, status: "search"|"recommendation"}){
const navigate = useNavigate();
console.log(data);


    return(<div style={{display: "flex", flexDirection: "column", minHeight:"3vh",  width: "230px", height: "275px"}}>
        <div>
        <ImageComponent type="albumn" src={data.cover_src} buttonComponent={<ButtonComponent id={data.id} type="albumn"/>}/>
   
     
       
        <a style={{textDecoration: "underline"}} onClick={()=>{navigate({to:"/music_pages/albumn_page", search:{id: data.id}})}}>{data.name} </a>
        <div>
        <AuthorList  main_author={data.main_author} extra_authors={data.extra_authors}/>
        </div>
        </div>
    </div>);
}


