import { SongInterface } from "./SongInterface";
import { ContainerWrapper } from "../utils/ContainerWrapper";


interface SongProps{
    song: SongInterface,
    onEdit: (index: number)=>void
}

export function CreatedSongs({song, onEdit}:SongProps){


    return(
        <div>
            <ContainerWrapper>
                Name:
            </ContainerWrapper>
            <ContainerWrapper>
                {song.name}
            </ContainerWrapper>
            <ContainerWrapper>
            <button onClick={()=>{onEdit(song.index)}}>Edit</button>
            </ContainerWrapper>
        </div>
    );
}