import { useSrcStore } from "../zustandStore/Store";
import {useQuery} from "urql";
import { useSearch } from "@tanstack/react-router";
import { AlbumnSong } from "../SongComponents/SonginAlbumnComponent";
interface AlbumnSearch{
    id: string
}




function AlbumnPage(){
    const {id}: AlbumnSearch = useSearch({from: "/author_create"});
const [result,]= useQuery({query: ``, variables: {id,}});

const {data, error, } = result;

console.log(data);

return(

    <div>
       
    </div>
);




}