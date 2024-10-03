import { AuthorData } from "../SearchForUpload/SearchResultComponent"

export interface SongInterface{
extra_authors: Array<AuthorData>
file: File,
name: string,
index: number
}
