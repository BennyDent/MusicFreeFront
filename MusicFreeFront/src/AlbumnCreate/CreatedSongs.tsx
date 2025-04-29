import { SongInterface } from "./SongInterface";
import { ContainerWrapper } from "../utils/ContainerWrapper";


interface SongProps{
    status: "edited"|"undo",
    song: SongInterface,
    onEdit: (Song: SongInterface)=>void
}

export function CreatedSongs({song, status, onEdit}:SongProps){


    return(
        <div>
            <ContainerWrapper>
                Name:
            </ContainerWrapper>
            <ContainerWrapper>
                {song.name}
            </ContainerWrapper>
            <ContainerWrapper>
            {status=="edited" ? <button onClick={()=>{onEdit(song)}}>Edit</button>: <button onClick={()=>{onEdit(song)}} > Undo</button>}
            
            </ContainerWrapper>
        </div>
    );
}