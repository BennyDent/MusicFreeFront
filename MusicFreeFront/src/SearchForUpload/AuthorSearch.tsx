import { TextField } from "@mui/material";

import {useQuery, useQueryClient} from "@tanstack/react-query";
import React,  {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import { Choose_AuthorContext } from "./Choose_AutorContext";
import { AuthorData } from "./SearchResultComponent";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {SearchResultComponent} from "./SearchResultComponent";
import { FieldComponent } from "./FieldComponent";
import { urlmaker } from "../utils/urlmaker";
import InfiniteScroll from "react-infinite-scroll-component";
import { PageInterface } from "../utils/PageInterface";
import { usePagination } from "../utils/usePagination";
const queryfn = async (urlarray: string[] ):Promise<PageInterface>=>{
   
   return await axios.get(urlmaker.make(urlmaker.url, urlarray)).then((result)=>(result.data))};

export interface MusicianForChoice{
    name: string,
    id: string

}

interface author_search_props{
    value: Array<AuthorData>|undefined|AuthorData,
    onChange: (data: Array<AuthorData>|AuthorData)=>void,
    queryKey: string,
    urlArray: string[],
    choice: "single"|"multiple"
}

export function SearchField({onChange, value, queryKey, urlArray, choice}:author_search_props){
    const q_client = useQueryClient();
    //const qClient= useQueryClient();
    const [findState, setFindState]= useState<string>("");
 const {hasMore, setHasMore,page_index,next} = usePagination()
 
    const {data, status} = useQuery({queryKey: [...urlArray, queryKey],queryFn: async ():Promise<PageInterface> =>{
    
       return await queryfn([...urlArray, findState, page_index.toString()]).then(result=>{setHasMore(result.hasMore); return(result);})} });
    
//qClient.refetchQueries({queryKey: ["authorSearch"]})
function handleUnchoosen(data: AuthorData){

    const filterFn = (m: AuthorData)=>{
        if(data.id==m.id && data.name== m.name){
            return false;
        }
        else{
            return true;
        }
       }

if("filter" in value!){onChange(value?.filter(filterFn));}else{  onChange(value!);}
  
 
  

    }

if(status=="error" && findState!=""){
    return(<div>Error</div>)
}
if(status=="success" && findState !=""){
    return(<div>Loading</div>)
}
if(status=="pending"){return(<div></div>)}
    return(<div>


        <FieldComponent value={findState} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setFindState(event.target.value);
    
}
    } find={()=>{
        q_client.resetQueries({queryKey: urlArray});
        q_client.refetchQueries({queryKey: urlArray});}}/>
    <Choose_AuthorContext  update={(data: AuthorData)=>{
  var new_array = value;
  if(new_array==undefined){
    new_array = [];
  }
  new_array.push(data);
        onChange(new_array);
    }}>

      {choice=="single"&& value!=undefined ? <InfiniteScroll loader={<div></div>} next={()=>{next([...urlArray, findState, page_index.toString()], q_client)}} dataLength={data!.page.length} hasMore={hasMore} style={{overflowY: "scroll",maxHeight: "100px", maxWidth: "30%", paddingTop: "10px", paddingBottom:"10px" }}>
         {data!.page.map((data, index)=>(<SearchResultComponent status="unchoosen" key={index} updateFn={(data:AuthorData)=>{handleUnchoosen(data)}} name={data.name!} Id={data.id}/> ))}
        </InfiniteScroll> :}
        </Choose_AuthorContext> 
      
         
        
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

return(<div >

{data?.data.map((data:{name: string, id: string}, index:number)=>(<SearchResultComponent status="choosen" name={data.name} Id={data.id} key={index} updateFn={undefined}/>))}
</div>)
}