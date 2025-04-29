import { IconButton,  MenuList} from '@mui/material';
import { Popper } from '@mui/base/Popper';
import { styled, css,alpha, display } from '@mui/system';
import {useState, useEffect, useRef, createContext, useContext, RefObject} from 'react'; 
import { useOutsideClick } from '../utils/OutsideClick';
import './ThreeDotsButton.css';
import { three_dots_context } from './SongComponent';
import {Share_Array } from './useMenuFunctions';
import { PlaylistFindTemplate } from './PlaylistCreate/PlaylistFindTemplate';
import $ from 'jquery';
export interface StateChildObject{
        anchor: null|HTMLElement, setAnchor: (anchor: null|HTMLElement)=> void
    }

interface StatesObject{
    playlist: StateChildObject,
    share : StateChildObject,
    portal_ref: RefObject<HTMLElement>
  
}

function mouseout(event:React.MouseEvent,  state_object:StateChildObject, className: string, ){
    if(event.relatedTarget instanceof Element){

        console.log(event.relatedTarget.className, className, 118)
        console.log(!event.relatedTarget.className?.includes(className), 118)
    if(!event.relatedTarget.className?.includes(className)){
    state_object.setAnchor(null);

}
    }
}



function useStates( portal_div: RefObject<HTMLElement>, ):StatesObject{
const [anchorPlaylist, setAnchorPlaylist] = useState<null|HTMLElement>(null);
const [anchorShare, setAnchorShare] = useState<null|HTMLElement>(null);
return {  portal_ref: portal_div,  playlist:{  anchor: anchorPlaylist, setAnchor: setAnchorPlaylist},
share:{  anchor: anchorShare, setAnchor: setAnchorShare}
}

}
export const StateContext = createContext<StatesObject>({} as StatesObject);

export function ThreeDotComponent({menuList, hover, }:{menuList: Array<MenuElement>, hover: "hover"|"not_hover", }){
    const anchorRef = useRef<HTMLDivElement>(null) 
   const div_ref = useRef<HTMLDivElement>(null);
   const {setStatic} = useContext(three_dots_context);
   const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);
 const ref = useRef<HTMLDivElement>(null);
   const object = useStates(div_ref);
function handleClickOutside(event:any) {
console.log("here");

        if (ref.current && !ref.current.contains(event.target)) {
console.log("there"); 
console.log(anchorEl);         
          if(anchorEl!=null){
            console.log("this");
            setStatic();
          setAnchorEl(null);
          }
        }
      }

useEffect(()=>{
    
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
} ,[ref,anchorEl]);
 const handleClick = (event: React.MouseEvent<HTMLElement>) => {
 
    
   setAnchorEl(anchorEl ? null : event.currentTarget);

};
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
  
    return(<div ref={ref} >
        <div ref={anchorRef}>
        <button  className={"three_dots "+hover} aria-describedby={id} onClick={handleClick}>{"..."}</button></div>
      <StateContext.Provider value={object}>
    <div ref={div_ref} style={{}}>
      <PopComponent   popper_type='main'   menulist={menuList} anchorProp={anchorEl} setAchorProp={setAnchorEl}/>
      <PopComponent popper_type='playlist'/>
      <PopComponent popper_type='share' menulist={Share_Array}/>
      </div>
    </StateContext.Provider>   
    </div>);
}



function PopComponent({popper_type, anchorProp, setAchorProp, anchorRef,  menulist}:{popper_type: "main"|"playlist"|"share", menulist?: Array<MenuElement>, anchorRef?:RefObject<HTMLElement>, anchorProp?: HTMLElement|null, setAchorProp?:(input:null | HTMLElement)=>void  }){
    const {portal_ref, share, playlist}= useContext(StateContext);
   const ref = useRef<HTMLDivElement>(null);

console.log(popper_type);
var check = 23232323 

let anchor;
if(popper_type=="main"){
anchor= anchorProp
}
    if(popper_type=="share"){
anchor=share.anchor
    }
    if(popper_type=="playlist"){
anchor=playlist.anchor
    }


function handleMouseOut(ev:React.MouseEvent){

      
    mouseout(ev, (popper_type=="playlist"? playlist: share), "main");

}

console.log(anchor,popper_type);
    const open = Boolean(popper_type=="main" ? anchorProp:(popper_type=="playlist" ? playlist.anchor: share.anchor));
    return(
   
        <Popper container={portal_ref.current}  onMouseLeave={(popper_type!="main" ?(ev:React.MouseEvent)=>{handleMouseOut(ev)}: (ev:React.MouseEvent)=>{})} className={(popper_type!="main" ? "additional": undefined)} style={{padding: "0.4%", backgroundColor:"#E5EAF2"}} keepMounted   placement={(popper_type=="main" ? "bottom-start": "left-start")} modifiers={[{ name: 'offset',enabled: true, options:{offset:(popper_type=="main"? [15, 0]:[0,0])} },
        {name:'preventOverflow', enabled: true,  options:{ boundariesElement: 'scrollParent'}}]} open={open} anchorEl={anchor}>

   {popper_type=="playlist" ? <PlaylistFindTemplate />:menulist!.map((object: MenuElement)=>{
    if(object.text=="Add to Playlist"||object.text == "Share"){
        console.log(object);
        return <MenuHoverComponent {...object} />
    }
    return <MenuComponent {...object} />})
} 
        </Popper>
    );}
  




function MenuHoverComponent( {text, action, name}:MenuElement){
   var {playlist, share,  } = useContext(StateContext);
   const ref = useRef<HTMLDivElement>(null);
  
console.log(text, action, name);
    
   function  handleMouseOver(){
if(name=="playlist"){

console.log(ref.current,32);
share.setAnchor(null);
playlist.setAnchor(ref.current);
}
if(name=="share"){
    console.log(ref.current,35);
share.setAnchor(ref.current);
playlist.setAnchor(null);
}



 }   



   
    return(
        <MenuDiv ref={ref} className={'main'}  onMouseOut={(ev)=>{mouseout(ev,(name=="playlist" ? playlist: share) ,"additional")}}  onMouseOver={()=>{handleMouseOver(); console.log(name)}}  onClick={()=>{action()}}>{text}</MenuDiv>
       
        );



  
  
   
}
function MenuComponent({text, name, action}:MenuElement){


return(
<MenuDiv  className={name}  onClick={()=>{action()}}>{text}</MenuDiv>
);
}


export interface MenuElement{
    text: string, action: (name?: string)=>void, name: string, 
}





export const grey={
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025'
}


export const MenuDiv= styled('div')(
    ({theme})=> ({
        
        backgroundColor: theme.palette.mode === "dark" ? grey[800] : grey[100],
        '&:hover': {
        backgroundColor: theme.palette.mode === "dark" ? grey[500] : grey[50]
    }})
)

const StyledPopperDiv = styled('div')(
    ({ theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[700]};
    font-size: 0.875rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    opacity: 1;
    margin: 0.25rem 0;
  `,
);