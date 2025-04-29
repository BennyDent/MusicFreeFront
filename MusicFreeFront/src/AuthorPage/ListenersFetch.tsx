import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { urlmaker } from "../utils/urlmaker";


export function ListenersFetch({id}:{id: string}){
const queryFunc = async()=>(axios.get(urlmaker.make(urlmaker.url,["author","subcriptions_count", id])));
const { isLoading, isError, data} = useQuery({queryKey: ["subcripers_count"],queryFn: queryFunc });

if (isLoading) {
    return <h1></h1>
  }

  if (isError) {
    return <h1></h1>
  }

    return(<h1>{data!.data+" viewers"}</h1>);
}