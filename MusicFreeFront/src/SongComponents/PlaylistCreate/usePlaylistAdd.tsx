import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { config } from "../../utils/AuthoriseHeader";
import { urlmaker } from "../../utils/urlmaker";
export function usePlaylistAdd(){
const mutate = useMutation({mutationFn: async (id: string)=>(await axios.post(urlmaker.make(urlmaker.url, ["playlist", "create_playlist"]), {song_id: id}, config))});


    return(async (id:string)=>{await mutate.mutate(id)});
}