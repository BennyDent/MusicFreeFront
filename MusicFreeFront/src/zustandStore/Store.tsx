import { create } from 'zustand'
import { AuthorData } from '../SearchForUpload/SearchResultComponent';

interface SongData{
    authors: Array<AuthorData>,
    name: string,
}
interface SrcStore{
    src: string| undefined,
    song: SongData|undefined
    setSrc: (input: string|undefined)=>void,
    setSong: (input: SongData|undefined)=>void
}




export const useSrcStore = create<SrcStore>((set) => ({
   src: undefined, 
   song: undefined,
    setSrc:(input: string|undefined)=>{
        if(input==undefined){
            set((state)=>({ ...state,src: undefined}))
        }
        else{
            set((state)=>({...state, src: "https://localhost:7190/music/get_song/"+input}))
      
        }
  
    }, 
   setSong: (input:SongData|undefined)=>{
    set((state)=>({...state, song: input}));

   }
  }));