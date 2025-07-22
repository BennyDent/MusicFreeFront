import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { useRouteContext } from "@tanstack/react-router";
import { SongData } from "../utils/SongData";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import InfiniteScroll  from "react-infinite-scroll-component"
import { map_function } from "./SongSearch";
import axios,{ AxiosInstance, AxiosPromise }  from "axios";
import { search_data_type } from "./SongSearch";
import { SearchRequest } from "./SongSearch";
import { urlmaker } from "../utils/urlmaker";
import { config } from "../utils/AuthoriseHeader";
interface SearchInterface{
    search: string,
    type: "albumn"|"author"|"song"
}





export function FullPageSearch(){
const {status} = useRouteContext({from:'/music_pages/search'});
const {search, type}:SearchInterface = useSearch({from:"/music_pages/search_full_page"});
const [isMore, setisMore] = useState<boolean>(true);
const [page_index, setPage_index] = useState<number>(0);
const [data, setDate] = useState<Array<search_data_type>>([]);


async function onNext(){
var result: Array<search_data_type> = await SearchRequest(["","", type, search, (page_index+1).toString() ]);
setDate([...data, ...result]);
}

return(<div><InfiniteScroll next={()=>{onNext}} loader={<div></div>} dataLength={data.length} hasMore={isMore}>
    {data.map(map_function)}
    </InfiniteScroll></div>);
}