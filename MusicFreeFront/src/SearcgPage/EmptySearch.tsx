import axios from "axios"
import {useQuery} from "@tanstack/react-query"
import { config } from "../utils/AuthoriseHeader"
import { urlmaker } from "../utils/urlmaker"
import { AlbumnComponent, AlbumnResult } from "../SongComponents/AlbumnComponent"
import { AuthorComponent, AuthorFetch } from "../SongComponents/AuthorComponent"

interface LastSearch{
type: "albumn"|"author",
result: AlbumnResult|AuthorFetch
}

function instanceofAlbumnResult(object: any): object is AlbumnResult { return true;}



const queryFunc = async ()=>(axios.get(urlmaker.make(urlmaker.url,["last", "search"])).then((r)=>{return r.data;}));

export function EmptySearch(){
    const {data, isLoading, isError, error} = useQuery({queryFn: queryFunc, queryKey:["last_search"]});
    
    if(isLoading){
        return <div></div>;
    }

    if(isError){
        console.log(error);
        if(error.message=="Request failed with status code 401"){
            return<div ><p style={{textAlign: "center", marginTop:"10vh", marginLeft:"3vh"}}>Authorise to see search history</p></div>
        }else{

               return <div></div>;
        }
     
    }

    return(<div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", overflow: "hidden"}}>
{data.data.map((data: LastSearch, index:number)=>{
if (instanceofAlbumnResult(data.result)){
return(<AlbumnComponent data={data.result} key={index}/>);
}else{
    <AuthorComponent data={data.result} key={index}/>
}

})}
    </div>)
}
