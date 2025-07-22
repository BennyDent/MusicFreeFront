import { useNavigate, useSearch } from "@tanstack/react-router";
import React, { PropsWithChildren } from "react";
import { SearchInput } from "./SeatchInput";
import {useState} from "react"
import { SearchComponent } from "./SongSearch";
import {useQuery} from "@tanstack/react-query";
import { EmptySearch } from "./SongSearch";

export interface SearchPageParams{
    search: string,
}

export function SearchPageTemplate(){
const navigate = useNavigate();
const {search}:SearchPageParams = useSearch({from:"/music_pages/search"});

    return(
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginLeft: "20%"}}>
        <div style={{display:"flex", flexDirection: "column", }}>
      
        {search==""? <EmptySearch/>: <SearchPageResults 
        authors={<SearchComponent url_strings={[""]} />}
        albumns={<SearchComponent  url_strings={[""]} />} songs={<SearchComponent  url_strings={[""]}/>}/>}
        </div></div>
    );
}

//      {albumns}  {authors}  
function SearchPageResults({ songs, albumns, authors }:{songs: React.ReactNode, albumns: React.ReactNode, authors:React.ReactNode }){
   const {search}:SearchPageParams = useSearch({from:"/music_pages/search"});
    const navigate = useNavigate();
    return(
        <div>
          <h1 onClick={()=>{navigate({to:"/music_pages/search_full_page", search: {type: "song", search:search }})}}>Songs:</h1>
            {songs}
            <h1 onClick={()=>{navigate({to:"/music_pages/search_full_page", search: {type: "albumn", search:search }})}}>Albumns:</h1>
       
            <h1 onClick={()=>{navigate({to:"/music_pages/search_full_page", search: {type: "authors", search:search }})}}>Authors:</h1>
         
        </div>
    );
}
