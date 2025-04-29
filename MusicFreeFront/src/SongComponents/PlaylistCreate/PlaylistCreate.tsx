import { CreatePlaylistTemplate } from "../../CreatePlaylist/CreatePlaylistTemplate";
import { useContext } from "react";
import { three_dots_context } from "../SongComponent";
import Dialogue from '@mui/material/Dialog';
import { useState } from "react";
import { MenuDiv } from "../ThreeDotsButton";

export function PlaylistCreateComponent({}:{}){
var {song_id} = useContext(three_dots_context);
const [open_name, setOpenName] = useState<boolean>(false);
    return(
    <div>
<MenuDiv onClick={()=>{setOpenName(true)}}>
<a>Create Playlist!</a>
</MenuDiv>
<Dialogue open={open_name}>
<CreatePlaylistTemplate id={song_id} setClose={()=>{setOpenName(false)}}/>
</Dialogue>
    </div>
);
}