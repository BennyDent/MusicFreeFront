import {createContext, PropsWithChildren} from "react";
import { SongData } from "../zustandStore/Store";
import {SongFetchInterface} from "./AlbumnPage";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";

export const SongListcontext = createContext<Array<SongData>>([]);


export function For_Sort(a:SongFetchInterface, b: SongFetchInterface){
    return a.albumn_index- b.albumn_index;
}

export function AlbumnListProvider({songs, albumn_id, children, author, extra_authors }: PropsWithChildren<{ albumn_id: string, author: AuthorData, extra_authors: Array<AuthorData>, songs:Array<SongData>}>){


return(
    <SongListcontext.Provider value={songs}>
{children}
    </SongListcontext.Provider>
);
}