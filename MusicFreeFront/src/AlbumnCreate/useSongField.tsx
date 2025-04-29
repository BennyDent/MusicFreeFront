import { useState } from "react";
import { SongInterface } from "./SongInterface";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";

export interface HookReturn{
    text_input: {name: string|undefined, index: number|undefined},
    
    authorState: AuthorData[] | undefined,
    
    fileState: File|undefined,
setSong: (song:SongInterface)=> void,
setDefault: ()=>void,
}

export function useSongField() {
    const [text_inputs, setTextInputs] = useState<{name: string|undefined, index: number|undefined}>({name: undefined, index: undefined  });
    const [name, setName] = useState<string>("");
    const [index, setIndex] = useState<number>(1);
    const [authorsState, setAuthors] = useState<Array<AuthorData>|undefined>(undefined); 
    const [fileState, setfileState] = useState<File|undefined>(undefined);
    
    const setSong = (song: SongInterface)=>{
        setTextInputs({name: song?.name, index: song?.index});
        setAuthors(song?.extra_authors);
        setfileState(song?.file);
    }

    const setDefault = ()=>{
        
        setAuthors([]);
        setfileState(undefined);
    }
    
  //  return({setSong: setSong, setDefault: setDefault, text_input: text_inputs, setTextInputs: setTextInputs, authorState: authorsState, setAuthors: setAuthors, fileState: fileState, setfileState: setfileState });
}


