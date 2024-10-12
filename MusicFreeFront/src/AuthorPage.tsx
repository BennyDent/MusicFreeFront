import { useSearch } from "@tanstack/react-router";
import {useQuery} from "urql";
import { AuthorData } from "./SearchForUpload/SearchResultComponent";
import { AlbumnSong } from "./SongComponents/SonginAlbumnComponent";



function AuthorPage(){

const authrodata: AuthorData = useSearch({from: "/albumn_create"})
return(<div>
    <div>
    <h1>{authrodata.name}</h1> {/*header with name*/}
    
    </div>
<div>
<AuthorMostPopularSongs />
</div>
</div>)
}


function AuthorMostPopularSongs(){
    const authrodata: AuthorData = useSearch({from: "/albumn_create"});
    const [result_query, reexecuteQuery] = useQuery({query: ``, variables: {id: authrodata.Id}})
    const {data, fetching, error } = result_query; 

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return(
        <div>
            {data.map((data, index)=> <AlbumnSong />)}
        </div>
    );
}