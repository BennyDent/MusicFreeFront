
import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import React, {useState} from "react";
import axios from "axios";
import { SongInterface } from "./SongInterface";
import { CreatedSongs } from "./CreatedSongs";
import { SongField } from "./SongField";
interface SongFieldProps{
    value: Array<SongInterface>,
    onChange: (songs: Array<SongInterface>)=>void
}

function SongFieldsArray({value, onChange}:SongFieldProps){

const [status, setStatus] = useState<"create"|"edit">("create");
const [index, setIndex] = useState<number|undefined>();
function handleEdit(index: number){
  
    setStatus("edit");
    setIndex(index);
}
    return(
        <div>
            <ContainerWrapper>
                {value.map((data: SongInterface)=>(<CreatedSongs song={data} onEdit={handleEdit}/>))}
            </ContainerWrapper>
            <ContainerWrapper>
                {status=='create'? <SongField file={undefined} name={undefined} index={undefined} authors={[]} onChange={(song: SongInterface)=>{
                    var value_copy = value;
                    value_copy.push(song);
                    onChange(value_copy);}}/>:
                <SongField file={value[index!].file} name={value[index!].name} index={value[index!].index} authors={value[index!].extra_authors} onChange={}/>
                }
            </ContainerWrapper>
        </div>
    );
}