import axios from  "axios";
import { useQueryClient } from "@tanstack/react-query";
import { config } from "./AuthoriseHeader";
import { url_fn } from "./urlmaker";


function useSongListened(){
const qcl = useQueryClient();

async function SongListened(song_id: string){
await axios.patch(url_fn(["music", "song_listened", song_id])).then((data)=>{
if(data.data.status == "changed")
 qcl.refetchQueries({queryKey:['liked', 'last', data.data.type], type: "active"})
});
}

return(SongListened);
}