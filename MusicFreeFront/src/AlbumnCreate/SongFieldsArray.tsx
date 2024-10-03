
import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";
import { CreatedSongs } from "./CreatedSongs";

interface SongFieldProps{
    value: Array<SongInterface>,
    onChange: (songs: Array<SongInterface>)=>void
}

function SongFieldsArray({value, onChange}:SongFieldProps){

const [status, setStatus] = useState<"create"|"edit">("create");
function handleEdit(){
  
    setStatus("edit");

}
    return(
        <div>
            <ContainerWrapper>
                {value.map((data: SongInterface)=>(<CreatedSongs song={data} onEdit={}/>))}
            </ContainerWrapper>
        </div>
    );
}