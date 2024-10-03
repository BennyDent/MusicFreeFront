import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSrcStore } from '../zustandStore/Store';
interface SongPlayerProps{
src: string
}

function SongPlayer(){
const src = useSrcStore((state)=>state.src);
return(<AudioPlayer autoPlay src={src}/>)
}