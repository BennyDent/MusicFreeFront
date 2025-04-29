import { TextField } from "@mui/material";
import React, { useState } from "react";
import { AuthorData } from "./SearchResultComponent";
import { Choose_AuthorContext } from "./Choose_AutorContext";
import { SearchResultComponent } from "./SearchResultComponent";
import { SearchResults } from "./AuthorSearch";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { FieldComponent } from "./FieldComponent";
import axios from "axios";
interface AlbumnProps{
    value: AuthorData,
    onChange: (m: AuthorData)=>void,
    author_id: string
}

const queryfn = async (authorname: string )=>(await axios.get("https://localhost:7190/music/find_albumn/"+authorname));

//qClient.refetchQueries({queryKey: ["authorSearch"]})
export function AlbumnSearch({value, onChange,  author_id}:AlbumnProps){

    const [findState, setfindState]= useState<string>("")
    const [is_choosen, setisChoosen] = useState<boolean>(false)
    
const {data, status} = useQuery({queryKey: ["albumnSearch"],queryFn: async ()=>{
    console.log(findState);
    return await queryfn(findState);} });
    return(<div>
        <FieldComponent value={findState} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setfindState(event.target.value);}} find={()=>{}}/>
     
       
    {is_choosen==false ? <Choose_AuthorContext  update={(data: AuthorData)=>{
      console.log(33);
      setisChoosen(true);
        onChange(data);
    }}>
        <SearchResults value={findState} data={data} status={status} />
        </Choose_AuthorContext> : <SearchResultComponent status="choosen" updateFn={(data:AuthorData)=>{setisChoosen(false)}} name={value.name!} Id={value.id}/>}
       
  </div>  );
}