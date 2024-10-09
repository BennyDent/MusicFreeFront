import { TextField } from "@mui/material"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React,  {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import { Choose_AuthorContext } from "./Choose_AutorContext";
import { AuthorData } from "./SearchResultComponent";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {SearchResultComponent} from "./SearchResultComponent";
import { FieldComponent } from "./FieldComponent";
import { SearchResults } from "./AuthorSearch";
const queryfn = async (authorname: string)=>(await axios.get("https://localhost:7190/music/find_author/"+authorname));



interface author_search_props{
    value: AuthorData,
        onChange: (data: AuthorData)=>void,
    author_id?: string,
    queryFn: (s: string, author_id?: string)=>Promise<AxiosResponse<any,any>| undefined>
}

export function SearchField({onChange, value, author_id, queryFn}:author_search_props){
    
    const [is_choosen, setisChoosen] = useState<boolean>(false);
    //const qClient= useQueryClient();
    const [findState, setfindState]= useState<string>("");
    useEffect(()=>{} ,[findState]);
    
    const {data, status} = useQuery({queryKey: ["authorSearch"],queryFn: async ()=>(await queryFn(findState, author_id!)) });
    
//qClient.refetchQueries({queryKey: ["authorSearch"]})
function handleUnchoosen(data: AuthorData){
    console.log(data);
    console.log(value);
    const filterFn = (m: AuthorData)=>{
        if(data.Id==m.Id && data.name== m.name){
            return false;
        }
        else{
            return true;
        }
       }
    onChange(value);
}

     return(<div>
        <FieldComponent value={findState} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setfindState(event.target.value);}} find={()=>{}}/>
     
       
    {is_choosen==false ? <Choose_AuthorContext  update={(data: AuthorData)=>{
      console.log(33);
      setisChoosen(true);
        onChange(data);
    }}>
        <SearchResults value={findState} data={data} status={status} />
        </Choose_AuthorContext> : <SearchResultComponent status="choosen" updateFn={(data:AuthorData)=>{setisChoosen(false)}} name={value.name} Id={value.Id}/>}
       
  </div>);
}
interface dat{
    name: string
}
function ChoosenComponent({name}: dat){
return(
    <ContainerWrapper>
        {name}
    </ContainerWrapper>
);
}
interface SearchResultsprops{
  data: AxiosResponse<any,any>| undefined,
  status: string,
  value: string}

