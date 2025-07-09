import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { SongData } from "../utils/SongData";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import InfiniteScroll  from "react-infinite-scroll-component"
import { map} from "./SongSearch";
import axios,{ AxiosInstance, AxiosPromise }  from "axios";

import { urlmaker } from "../utils/urlmaker";
import { config } from "../utils/AuthoriseHeader";
interface SearchInterface{
    search: string,
    type: "albumn"|"author"|"song"
}





export function FullPageSearch(){

const [coursor, setCoursor] =  useState<number>(-10);
 const [search_results, setSearchResults]= useState<any>([]);  
const [hasMore, sethasMore] = useState<boolean>(true);

useEffect(()=>{if(coursor==-1){
    sethasMore(false);
}},[coursor]);
function Search(new_data: Array<any>){
    var new_array = search_results;
    new_array.push(new_data);
    return new_array;
}   
const request = async (search: string)=>(axios.get(urlmaker.make(urlmaker.url,["find", type, search, coursor!.toString() ]), config)
.then((response:any)=>(response.data)))
.then((data:any)=>{setSearchResults(Search(data));
    setCoursor(data.coursor);});
const {search, type }:SearchInterface = useSearch({from:"/music_pages/search_full_page"});

request(search);

function next(){
    request(search)
}
 if(search_results.length==0){
return(<div></div>)
 }



if(type=="song"){
 return(<div style={{display: "flex", flexDirection:"column", }}>
        <InfiniteScroll dataLength={search_results.length} next={next} hasMore={hasMore} loader={<div></div>}>{search_results.map(map[type])}</InfiniteScroll>
    </div>);
}else{
    return(<div style={{display: "flex", flexDirection:"row", justifyContent:"space-evenly" }}>
        <InfiniteScroll dataLength={search_results.length} next={next} hasMore={hasMore} loader={<div></div>}>{search_results.map(map[type])} </InfiniteScroll>
    </div>);
}
}