import { config } from "../utils/AuthoriseHeader";
import axios from "axios";
import { urlmaker } from "../utils/urlmaker";

   export const ListenedMutationFn = async(song_filename: string)=>(axios.post(urlmaker.make(urlmaker.url, ["music","song_listened", song_filename]), config));
