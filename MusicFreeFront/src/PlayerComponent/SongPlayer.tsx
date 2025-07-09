import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSrcStore } from '../zustandStore/Store';
import { ChangesongButton } from './ChangeSongoButton';
import {useRef} from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
interface SongPlayerProps{
src: string
}

export function SongPlayer(){
const src = useSrcStore((state)=>state.song);
const player = useRef<H5AudioPlayer>(new H5AudioPlayer({src: "https://localhost:7190/music/get_song/"+src?.src!}));
const setRef = useSrcStore((state)=>state.setref);

console.log(src);

return(<div style={{display: "flex", justifyContent: "space-evenly"}} >
   <ChangesongButton status="previous" />
<AudioPlayer ref={player} preload='metadata' style={{width: "50vh", height: "10vh"}} autoPlay src={"https://localhost:7190/music/get_song/"+src?.src!}/>
<ChangesongButton status="next" />
</div>
);
}