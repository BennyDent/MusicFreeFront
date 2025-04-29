import { useSrcStore, SongData } from "../zustandStore/Store";
import {useQuery, gql} from "urql";
import { useSearch } from "@tanstack/react-router";
import {  SongComponent } from "../SongComponents/SongComponent";
import { AuthorList } from "../utils/AuthorsList";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { SongInterface } from "../AlbumnCreate/SongInterface";

import { AlbumnListProvider } from "./AlbumnPageContext";
interface AlbumnSearch{
    id: string
}


function return_array(first_array: Array<AuthorData>, add_elements: Array<AuthorData> ){
first_array.push(...add_elements);
return first_array;
}

export interface AlbumnInterface{
    name: string,
    id: string,
    main_Author: AuthorData,
    extra_Authors: Array<AuthorData>,
    songs: Array<SongFetchInterface>
}

export interface SongFetchInterface{
    name: string,
    id: string,
    albumn_index: number,
    song_filename: string,
    extra_authors: Array<AuthorData>,
    albumn: AuthorData
    __typename?: string
}


const Template = gql`query($id: UUID! ){
    albumn(where:{id:{eq:$id}}){
        name
        id
        main_Author{
            name
            id
        }
        extra_Authors{
        author{
            name
            id
        }
       
        }
        songs{
                        name
                        id
            albumn_index
            extra_authors{
                author{
                    name
                    id
                }
            }
            song_filename
        }
        }
    }`


export function AlbumnPage(){
    const {id}: AlbumnSearch = useSearch({from: "/music_pages/albumn_page"});
const [result,]= useQuery({query: Template, variables: {id,}});

const {data, error, fetching } = result;
console.log(fetching);
if(error){
    return LoadingTemplate;
}
if(fetching){
    return LoadingTemplate;
}

const albumn_data:AlbumnInterface = data.albumn[0];
console.log(albumn_data);


let song_data_array = SongDataTrasform(albumn_data.songs,albumn_data.id, albumn_data.main_Author, albumn_data.extra_Authors);
console.log(song_data_array);
return(
<div>
    <h1>{albumn_data.name}</h1>
    <AuthorList extra_authors={albumn_data.extra_Authors}  main_author={albumn_data.main_Author}/>
    <AlbumnListProvider songs={song_data_array} albumn_id={albumn_data.id} author={data.main_Author} extra_authors={data.extra_Authors}>
    {song_data_array.map((data, index)=>(<SongComponent status="albumn" index={index} song={data} />))}
   </AlbumnListProvider>
    </div>
);




}




function LoadingTemplate(){
    return(<div></div>)
}


function SongDataTrasform(array: Array<SongFetchInterface>, albumn_id: string, main_author: AuthorData, extra_authors:Array<AuthorData>):Array<SongData>{
    let songs_array:Array<SongData> = []
var songs_sorted = array.sort((a:SongFetchInterface, b: SongFetchInterface)=>(a.albumn_index- b.albumn_index));
songs_sorted.forEach((data: SongFetchInterface)=>{
    console.log(data);
    songs_array.push({albumn_id: albumn_id, id: data.id, main_author: main_author, extra_authors: extra_authors , name:data.name, src: data.song_filename });
});
return songs_array;
}