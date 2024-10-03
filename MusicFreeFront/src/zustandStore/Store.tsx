import { create } from 'zustand'


interface SrcStore{
    src: string| undefined;
    setSrc: (input: string|undefined)=>void
}




export const useSrcStore = create<SrcStore>((set) => ({
   src: undefined,
    setSrc:(input: string|undefined)=>{
        if(input==undefined){
            set((state)=>({src: undefined}))
        }
        else{
            set((state)=>({src: "https://localhost:7190/music/get_song/"+input}))
        }
    }
  }));