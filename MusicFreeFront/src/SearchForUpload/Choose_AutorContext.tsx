import { createContext } from "react"
import { PropsWithChildren } from "react";
import { AuthorData } from "./SearchResultComponent";
export const Author_Input = createContext((m:AuthorData)=>{});


interface ContextProviderProps{
    update: (m:AuthorData)=> void,
    
}
export function Choose_AuthorContext({update, children}:PropsWithChildren<ContextProviderProps>){


return(
    <Author_Input.Provider value={update}>
        {children}
    </Author_Input.Provider>
);
}