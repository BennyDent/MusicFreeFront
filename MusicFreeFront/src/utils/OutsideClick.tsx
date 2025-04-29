import  React,{ useRef, useEffect } from "react";
import { useContext } from "react";
import { three_dots_context } from "../SongComponents/SongComponent";

export function useOutsideClick(ref:React.RefObject<HTMLDivElement>,anchorEl:HTMLElement|null,setAnchorEl:React.Dispatch<React.SetStateAction<HTMLElement | null>> ){
const {setStatic} = useContext(three_dots_context);


}