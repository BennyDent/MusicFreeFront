import { useNavigate, useRouterState } from "@tanstack/react-router";
import { MenuElement } from "./ThreeDotsButton";


export const Share_Array: Array<MenuElement> = [{text:"with link", name:"additional", action: ()=>(name: string)=>{navigator.clipboard.writeText("https:"+ name)}}];
export function useMenuFunction({albumnId,}:{albumnId:string|undefined,}): Array<MenuElement>{
const router = useRouterState();
    const navigate = useNavigate({from: router.location.pathname });

 let main_array = [ {text: "Add to Playlist", name: "playlist", action:()=>{}}, {text:"Share", name:"share",  action: ()=>{} }]
 if(albumnId !=undefined){
     main_array.push({action:()=>{
console.log(albumnId);
navigate({to:"/music_pages/albumn_page", search:{albumnId: albumnId}})
    }, name: "albumn", text: "Go to albumn!"}
);
 }

    return main_array ;
}