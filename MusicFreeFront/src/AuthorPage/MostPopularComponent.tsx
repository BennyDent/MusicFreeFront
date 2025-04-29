import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { urlmaker } from "../utils/urlmaker";
import { AlbumnComponent, AlbumnResult } from "../SongComponents/AlbumnComponent";
import { SongComponent } from "../SongComponents/SongComponent";
import { SongData } from "../zustandStore/Store";


export function MostPopularComponent({type, id}:{id: string, type: "songs"|"albumns"}){
const fetchFunc = async ()=>(await axios.get(urlmaker.make(urlmaker.url, ["authors", type, id ])).then((r:AxiosResponse)=>(r.data)));
const {isLoading, isError, data} = useQuery({queryKey:["most_popular", type],queryFn:fetchFunc, retry: false });

if (isLoading) {
    return <h1></h1>
  }

  if (isError) {
    return <h1></h1>
  }
const functions = {
    songs: (data:SongData, index:number)=>(<SongComponent song={data} index={index} key={index} status={"search"}/>),
    albumns: (data:AlbumnResult, index:number)=>(<AlbumnComponent data={data} />) ,
}

return(<div>
{data.map(functions[type])}
</div>);
}