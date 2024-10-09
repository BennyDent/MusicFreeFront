import { SongInterface } from "./SongInterface";
import { ContainerWrapper } from "../utils/ContainerWrapper";


interface SongProps{
    song: SongInterface,
    onEdit: (Song: SongInterface)=>void
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
            <button onClick={()=>{onEdit(song)}}>Edit</button>
            </ContainerWrapper>
        </div>
    );
}