import { AuthorData } from "../SearchForUpload/SearchResultComponent"

export interface SongData{
    main_author: AuthorData,
     extra_authors: Array<AuthorData>,
    name: string,
    id: string,
    albumn_id: string|undefined,
    src?: string,
    is_liked: boolean
}