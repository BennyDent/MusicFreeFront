import {useQuery, useQueryClient} from "@tanstack/react-query"
import {urlmaker} from "../utils/urlmaker";
import axios, {AxiosResponse} from "axios";
import { SongComponent } from "../SongComponents/SongComponent";
import { SongData } from "../utils/SongData";
import { AuthorFetch } from "../utils/Authorfetch";
import { AuthorComponent, } from "../SongComponents/AuthorComponent";
import { AlbumnComponent} from "../SongComponents/AlbumnComponent";
import { config } from "../utils/AuthoriseHeader";
import { useSearch } from "@tanstack/react-router";
import { SearchPageParams } from "./SearchPageTemplate";
import { QueryFunctionContext } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { url_fn } from "../utils/urlmaker";
import { useState, useEffect } from "react";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import {Popover} from "@mui/material";
import { AlbumnFetch } from "../utils/AlbumnFetch";
const searchFunc = async ({queryKey}:{queryKey: string[]})=>(axios.get(urlmaker.make(urlmaker.url,queryKey),config).then((data)=>(data.data)));

 interface SearchPropsInterface{
 
    url_strings: string[],
   
}

export type search_data_type = SongData|AlbumnFetch|AuthorFetch;
function isSongData(object:any):object is SongData {
return object.albumn_id != undefined;
}
function isAlbumnResult(object:any):object is AlbumnFetch{
return object.songs != undefined
}

function isAuthorFetch(object:any){
return object.songs == undefined && object.albumn_id != undefined;
}


export const map_function= (data:search_data_type, index: number )=>{

    if(isSongData(data)){
return  <SongComponent  song={data} status="search" key={index} />;
    } else if(isAlbumnResult(data)){
return <AlbumnComponent status="search" data={data}/>
    } else if(isAuthorFetch(data)) {
<AuthorComponent data={data} status="search"/>
    }
}



function AddSearch(type: "albumn"|"author", id: string){
    axios.post(urlmaker.make(urlmaker.url, ["search", "add_last"]),{type:type,Id: id},config);
}

//["music", url_string, search]

export async function SearchRequest(urls:Array<string>,){
    return await axios.get(url_fn(urls)).then((r: AxiosResponse)=>(r.data))
} 


export  function SearchComponent({ url_strings,}: SearchPropsInterface){
 const {search}:SearchPageParams = useSearch({from: "/music_pages/search"});


async function  SetData(){
var result = await SearchRequest(["music", ...url_strings, search]).then((r: AxiosResponse)=>(r.data))
 setSearch_Data(result);
}

const [search_data, setSearch_Data] = useState<Array<search_data_type>>();

useEffect( ()=>{  SetData()},[search]);

return(
    
   <div>
   {search_data?.map(map_function)}
   </div>
 
);

}

export function EmptySearchComponent({open, anchor}:{ open: boolean,
    anchor: Element,}){
    const [data, setData] = useState<Array<search_data_type>>([]);
    async function Set(){
        var result = await SearchRequest([""]);
        setData(result);
    }
    useEffect(()=>{Set()},[data]);

    if(data.length==0){
        return <div></div>;
    }
    return(
    <div>
    <Popover anchorEl={anchor} open={open}>
     {data.map(map_function)}
    </Popover>
    </div>
)
}


export function EmptySearch({}){
  return  <div></div>;
}