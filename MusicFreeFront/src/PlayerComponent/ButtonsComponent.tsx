import { useSrcStore } from "../zustandStore/Store";


export function ButtonsComponent(){

    return(
        <div style={{display: "flex", flexDirection: "row"}}>
        <ListButton/>
        </div>
    );
}


function ListButton(){
const state = useSrcStore((state)=>(state.song_order));
const setState = useSrcStore((state)=>(state.setSongOrder));

return(
        <div>
        {state=="on"? <button onClick={()=>{setState("off")}}>c</button>: < button onClick={()=>{setState("on")}}>l</button>}</div>
    );
}