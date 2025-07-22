import { SongData } from "./SongData";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
export interface AlbumnFetch{
    id: string,
    name: string,
    main_author: AuthorData,
    extra_authors: Array<AuthorData>,
    cover_src: string,
    songs: Array<SongData>
}