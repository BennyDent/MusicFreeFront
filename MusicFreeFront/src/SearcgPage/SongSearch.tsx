import {useQuery} from "@tanstack/react-query"
import {urlmaker} from "../utils/urlmaker";
import axios from "axios";
import { SongComponent } from "../SongComponents/SongComponent";
import { SongData } from "../utils/SongData";
import { AuthorComponent, AuthorFetch } from "../SongComponents/AuthorComponent";
import { AlbumnComponent, AlbumnResult } from "../SongComponents/AlbumnComponent";
import { config } from "../utils/AuthoriseHeader";
import { useSearch } from "@tanstack/react-router";
import { SearchPageParams } from "./SearchPageTemplate";
import { QueryFunctionContext } from "@tanstack/react-query";
import { useState } from "react";
const searchFunc = async ({queryKey}:{queryKey: string[]})=>(axios.get(urlmaker.make(urlmaker.url,queryKey),config).then((data)=>(data.data)));

 interface SearchPropsInterface{
    type: "song"|"albumn"|"author"
}
export const map = {
    song: (data:SongData,index: number)=>(
        <SongComponent  song={data} status="search" key={index} />
    ),
    albumn: (data:AlbumnResult, index:number)=>(<div onClick={()=>{AddSearch("albumn", data.id)}}> <AlbumnComponent data={data}/></div>),
    author: (data: AuthorFetch, index: number)=>(<div style={{width: "220px"}} onClick={()=>{AddSearch("author", data.id)}}><AuthorComponent data={data} key={index}/></div>)
}

function AddSearch(type: "albumn"|"author", id: string){
    axios.post(urlmaker.make(urlmaker.url, ["search", "add_last"]),{type:type,Id: id},config);
}

export function SearchComponent({ type}: SearchPropsInterface){
const {search}:SearchPageParams = useSearch({from: "/music_pages/search"});
const [isactive, setActive] = useState<boolean>(true);
const {data, isLoading, isError, isSuccess } = useQuery({queryKey: [ "search",type, search, "-5" ], queryFn: (context: QueryFunctionContext)=>{
    try{
        if(typeof context.queryKey == 'string'){
           return  searchFunc(context.queryKey);
        }
      
    }catch{

        
    };
}, enabled: isactive});
if(isLoading){
return <HollowComponent/>
}
if(isError){
    return <HollowComponent/>
}
console.log(data);

if(data?.data==""){
    return(<div></div>);
}

return(
    <div>
        {data?.data.search.map(map[type])}
    </div>
);

}

function HollowComponent(){

    return(<div></div>)
}