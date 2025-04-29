import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from 'axios';
import { SongData } from "../zustandStore/Store";
import {config} from "../utils/AuthoriseHeader"
import { urlmaker } from "../utils/urlmaker";
import style from './ThreeDotsButton.css';
const SendLike = async (songId: string )=>(await axios.post(urlmaker.make(urlmaker.url,["likes", "add_like"]),{song_Id: songId}, config).then((resp)=>(resp.data)))

export function AddToLikeButton({hover, is_like, songId, status}:{hover: "hover"|"not_hover", is_like: boolean, songId: string, status: "albumn"|"search"}){
 console.log(is_like);
    const queryClient = useQueryClient();
    const mut = useMutation({mutationFn: SendLike, onSuccess: ({data})=>{
console.log(data);
queryClient.invalidateQueries({queryKey: ["song" ]});
queryClient.setQueriesData({queryKey: ["song" ]}, (old_data:SongData|undefined)=>({...old_data!, is_liked: data.is_liked}));
    }});
function handleClick(){
console.log(songId);
mut.mutate(songId);
}

    return(<button className={"like " + hover} onClick={handleClick}>{is_like==true? "-": "+" }</button>)
}