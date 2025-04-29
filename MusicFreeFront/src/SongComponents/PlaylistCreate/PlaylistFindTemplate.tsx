import {useState, createContext, useContext} from 'react';
import { PlaylistList } from './PlaylistList';
import { PlaylistName } from './PlaylistName';
import { PlaylistCreateComponent } from './PlaylistCreate';
import { StateContext } from "../ThreeDotsButton";
export function PlaylistFindTemplate({}:{}){
const [state, setState] = useState<string>("");
const {playlist} = useContext(StateContext);



    return(<div className='additional' style={{display: "flex", flexDirection: "column"}}  >
     
     <input value={state} className='additional' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setState(e.target.value)}}/>
   <div className="additional"> <PlaylistCreateComponent /></div>  
        <PlaylistList name_string={state} />
        
    </div>);
}