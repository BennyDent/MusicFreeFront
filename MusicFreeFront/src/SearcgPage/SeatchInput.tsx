import { useSearchText } from "../zustandStore/SearchStore";
import {useState, useEffect} from "react"
import { useNavigate } from "@tanstack/react-router";
import { useSearch } from "@tanstack/react-router";
import { useLocation} from "@tanstack/react-router";
import { SearchPageParams } from "./SearchPageTemplate";
interface SearchProps{
state?: string,
setState?:(input: string)=>void 
}

export function SearchInput({}){
const location = useLocation({select: (location)=> location.pathname});
let search:SearchPageParams| undefined;
if (location == "/music_pages/search"){
 search  = useSearch({from:"/music_pages/search"});
}
const [state, setState] = useState<string>(()=>{if (location=="/music_pages/search"){return search!.search}else{return ""}}); 
const navigate = useNavigate();

useEffect(()=>{if(state!=""){
navigate({to:"/music_pages/search", search:{search: state}});
}else{if(search!= undefined){navigate({to:"/music_pages/search",});}}},[state]);
    return(
        <input  style={{borderRadius: "20px",
            paddingLeft: "10px",  border: "1px solid black", width: "450px", height: "35px", marginTop:"2vh", marginLeft: "4vh"}} value={state} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setState!(e.target.value)}}/>
    );
}