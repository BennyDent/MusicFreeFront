import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { PlayerTemplate } from '../PlayerComponent/PlayerTemplate';
import { SearchInput } from '../SearcgPage/SeatchInput';
import { Auth } from '../ts_files/auth';
import {useNavigate} from "@tanstack/react-router";
export const Route = createFileRoute('/music_pages')({
  beforeLoad: LoadFunc,
  
  component: MusicPage
})
 //<SongsOrder/>

function MusicPage(){
  const navigate =useNavigate();
  return( <div  >
 <div style={{position: "fixed", bottom: "1"}}>
<div style={{display: "flex", flexDirection: "row"}}>
<button onClick={()=>{navigate({to: "/music_pages/main_page"})}}>Home</button>
  <SearchInput/>
</div>

    <div style={{display: "flex", justifyContent:"space-evenly"}}>
     
    <Outlet/>
 
</div>


</div>
    <div style={{position: "fixed", bottom: "0"}}>

        <PlayerTemplate />
      </div>
  </div>);
}

async function  LoadFunc(context: any){
console.log(context)
 context.context.state = await context.context.check();
return context;
}

