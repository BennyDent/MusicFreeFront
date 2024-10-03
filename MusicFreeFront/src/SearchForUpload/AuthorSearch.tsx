import { TextField } from "@mui/material"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React,  {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import { Choose_AuthorContext } from "./Choose_AutorContext";
import { AuthorData } from "./SearchResultComponent";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {SearchResultComponent} from "./SearchResultComponent";
import { FieldComponent } from "./FieldComponent";
const queryfn = async (authorname: string)=>(await axios.get("https://localhost:7190/music/find_author/"+authorname));

export interface MusicianForChoice{
    name: string,
    id: string

}

interface author_search_props{
    value: Array<AuthorData>
    onChange: (data: Array<AuthorData>)=>void
}

export function AuthorSearch({onChange, value}:author_search_props){
    
    //const qClient= useQueryClient();
    const [findState, setFindState]= useState<string>("");
    useEffect(()=>{} ,[findState]);
    
    const {data, status} = useQuery({queryKey: ["authorSearch"],queryFn: async ()=>(await queryfn(findState)) });
    
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
    console.log(value.filter(filterFn));
    onChange(value.filter(filterFn));
}

    return(<div>
        <FieldComponent value={findState} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setFindState(event.target.value);}} find={()=>{}}/>
    <Choose_AuthorContext  update={(data: AuthorData)=>{
  var new_array = value;
  new_array.push(data);
        onChange(new_array);
    }}>
        <SearchResults value={findState} data={data} status={status} />
        </Choose_AuthorContext> 
        {value.map((data, index)=>(<SearchResultComponent status="unchoosen" key={index} updateFn={(data:AuthorData)=>{handleUnchoosen(data)}} name={data.name} Id={data.Id}/> ))}
         
        
        </div>
    )
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

export function SearchResults({data, status, value}: SearchResultsprops){
if(status=="error" && value !=""){
    return(<div>Error</div>)
}
if(status=="loading" && value !=""){
    return(<div>Loading</div>)
}
if(status=="enabled"){return(<div></div>)}
return(<div style={{overflowY: "scroll",maxHeight: "100px", maxWidth: "30%", paddingTop: "10px", paddingBottom:"10px" }}>
{data?.data.map((data:{name: string, id: string}, index:number)=>(<SearchResultComponent status="choosen" name={data.name} Id={data.id} key={index} updateFn={undefined}/>))}
</div>)
}