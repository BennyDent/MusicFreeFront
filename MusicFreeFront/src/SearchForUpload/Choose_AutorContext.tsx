import { createContext } from "react"
import { PropsWithChildren } from "react";
import { AuthorData } from "./SearchResultComponent";
export const Author_Input = createContext((m:AuthorData, status:"choosen"|"unchoosen")=>{});


interface ContextProviderProps{
    update: (m:AuthorData, status: "choosen"|"unchoosen")=> void,
    
}
