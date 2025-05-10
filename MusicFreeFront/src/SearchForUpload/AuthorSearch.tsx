import { TextField } from "@mui/material";

import {useQuery, useQueryClient} from "@tanstack/react-query";
import React,  {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import { Author_Input } from "./Choose_AutorContext";
import { AuthorData } from "./SearchResultComponent";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import {SearchResultComponent} from "./SearchResultComponent";
import { FieldComponent } from "./FieldComponent";
import { urlmaker } from "../utils/urlmaker";
import InfiniteScroll from "react-infinite-scroll-component";
import { PageInterface } from "../utils/PageInterface";
import { usePagination } from "../utils/usePagination";
import { isString } from "../utils/isString";
const queryfn = async (urlarray: string[] ):Promise<PageInterface>=>{
   
   return await axios.get(urlmaker.make(urlmaker.url, urlarray)).then((result)=>(result.data))};

export interface MusicianForChoice{
    name: string,
    id: string

}



interface author_search_props{
    value: Array<AuthorData|string>|undefined|AuthorData,
    onChange: (data: Array<AuthorData|string>|AuthorData|undefined
    )=>void,
    queryKey: string,
    urlArray: string[],
    choice: "single"|"multiple"
}

function MapSearchResults(data: AuthorData|string, status:"choosen"|"unchoosen", ){


    return(<SearchResultComponent name={(typeof data=="object" ? data.name! : data)} id={( typeof data=="object" ? data.id: undefined)} status={status} />);
}


export function SearchField({onChange, value, queryKey, urlArray, choice}:author_search_props){
    const q_client = useQueryClient();
    //const qClient= useQueryClient();
    const [findState, setFindState]= useState<string>("");
 const {hasMore, setHasMore,page_index,next} = usePagination()
 
    const {data, status} = useQuery({queryKey: [...urlArray, queryKey],queryFn: async ():Promise<PageInterface> =>{
    
       return await queryfn([...urlArray, findState, page_index.toString()]).then(result=>{setHasMore(result.hasMore); return(result);})} });
    
//qClient.refetchQueries({queryKey: ["authorSearch"]})
function handleUnchoosen(data: AuthorData|string){

    const filterFn = (m: AuthorData|string)=>{
       if(JSON.stringify(m)==JSON.stringify(data))return true; else return false
       }

if(Array.isArray(value)){onChange(value?.filter(filterFn));}else{  onChange(value!);}
  
 
  

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

    <Author_Input.Provider  value={(data: AuthorData|string, status: "choosen"|"unchoosen"
    )=>{

if(status=="unchoosen")onChange(Array.isArray(value) ? [...value, data ]: typeof data=="object" ? data: undefined );
else onChange(Array.isArray(value) ? value.filter((a)=>(JSON.stringify(a)==JSON.stringify(data) ? false:true)): undefined );
    }}>
        {choice=="multiple"&& Array.isArray(value) && <div>{value?.map((data:AuthorData|string)=>(MapSearchResults(data, "choosen")))}</div>}
        {choice=="multiple"||(value!=undefined&&choice=="single")&& <InfiniteScroll loader={<div></div>} next={()=>{next([...urlArray, findState, page_index.toString()], q_client)}} dataLength={data!.page.length} hasMore={hasMore} 
        style={{overflowY: "scroll",maxHeight: "100px", maxWidth: "30%", paddingTop: "10px", paddingBottom:"10px" }}>  {data!.page.map((data, index)=>(MapSearchResults(data, "unchoosen") ) )}
        </InfiniteScroll> }
        {choice=="single"&&!Array.isArray(value) && <SearchResultComponent status="choosen" name={value?.name!} id={value?.id!}/>}
        </Author_Input.Provider> 
      
         
        
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

