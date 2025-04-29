import axios from "axios";
import { config } from "../../utils/AuthoriseHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { urlmaker } from "../../utils/urlmaker";
import { createContext } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PlaylistName } from "./PlaylistName";

interface PlaylistName {name: string}
const list = async (string: string, pag_index: number)=>{

    return await axios.get(urlmaker.make(urlmaker.url, ["", string, pag_index.toString()]), config)}

const add_to_playlist = async (id: string)=>{
    return await axios.post(urlmaker.make(urlmaker.url, ["", ]), {id: id});
}

    export function PlaylistList({name_string, }:{name_string: string, }){
        const qClient = useQueryClient();
        const [pag_index, setPag_Index] = useState<number>(1);
        const {status, data} = useQuery({queryFn: async ()=>(await list(name_string,pag_index).then()), queryKey: ["", name_string]});
const mutate = useMutation({mutationFn: add_to_playlist});
    if(status =="error"){

    }
    if(status=="pending"){
        return (<div></div>)
    }
    return(<div>
<InfiniteScroll hasMore={data?.data.hasMore} loader={<div></div>} dataLength={data?.data.playlist.dataLength}  next={()=>{ setPag_Index(pag_index+1);qClient.invalidateQueries({queryKey:[]});}} >
{data?.data.map((data: PlaylistName )=>(<PlaylistName {...data}  />))}
    </InfiniteScroll>
    
    </div>);
}