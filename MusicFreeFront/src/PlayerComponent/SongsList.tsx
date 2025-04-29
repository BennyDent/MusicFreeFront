import { useSrcStore, SongData } from "../zustandStore/Store";


function SongList(){
    const current_index: number = useSrcStore((state)=>state.current_index);
    const song_list: Array<SongData> = useSrcStore((state)=>state.songs_list);
}