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
import { PageInterface } from "../utils/PageInterface";



interface author_search_props{

    value: AuthorData,
        onChange: (data: AuthorData)=>void,
  queryKey: string,
   urlArray: string[]
}

 function SearchField({onChange, value, queryKey,   urlArray}:author_search_props){
    
    const [is_choosen, setisChoosen] = useState<boolean>(false);
    const q_client= useQueryClient();
    const [findState, setfindState]= useState<string>("");
    useEffect(()=>{} ,[findState]);
    
    const {data, status} = useQuery({queryKey: [...urlArray, queryKey],queryFn: async ()=>(await queryFn(findState)) });
    
//qClient.refetchQueries({queryKey: ["authorSearch"]})
function handleUnchoosen(data: AuthorData){
    console.log(data);
    console.log(value);
    const filterFn = (m: AuthorData)=>{
        if(data.id==m.id && data.name== m.name){
            return false;
        }
        else{
            return true;
        }
       }
    onChange(value);
}
console.log(value);
     return(<div>
        <FieldComponent value={findState} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setfindState(event.target.value);}} find={()=>{()=>{
        q_client.resetQueries({queryKey: ["authorSearch"]});
        q_client.refetchQueries({queryKey: ["authorSearch"]});}}}/>
     
       
    {is_choosen==false ? <Choose_AuthorContext  update={(data: AuthorData)=>{
      console.log(33);
      setisChoosen(true);
        onChange(data);
    }}>
        <SearchResults value={findState} data={data} status={status} />
        </Choose_AuthorContext> : <SearchResultComponent status="choosen" updateFn={(data:AuthorData)=>{setisChoosen(false)}} name={value.name!} Id={value.id}/>}
       
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

