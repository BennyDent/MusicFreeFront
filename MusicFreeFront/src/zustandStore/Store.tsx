import { create } from 'zustand'
import { AuthorData } from '../SearchForUpload/SearchResultComponent';
import H5AudioPlayer from 'react-h5-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import React from "react";
export interface SongData{
    main_author: AuthorData,
     extra_authors: Array<AuthorData>,
    name: string,
    id: string,
    albumn_id: string|undefined,
    src?: string,
    is_liked: boolean
}
interface SrcStore{
    song_order: "on"|"off",
    ref: React.MutableRefObject<AudioPlayer>|undefined,
    setref: (ref:React.MutableRefObject<AudioPlayer>)=>void,
    setSongWithListenList: ( songs_list: Array<SongData>, index: number )=> void
    setCurrentIndex: (index: number)=>void,
    current_index: number,
    song: SongData|undefined
    setSrc: (input: string|undefined)=>void,
    setSong: (input: SongData|undefined)=>void,
    songs_list: Array<SongData>,
    setSongs_list: (input: Array<SongData>)=>void,
    addfirstSonglist: (input: SongData, song_array: Array<SongData>, current_index: number)=>void,
    setSongOrder: (status:"on"|"off")=>void
}




export const useSrcStore = create<SrcStore>((set) => ({
    setSongOrder: (status:"on"|"off")=>{
        set((state)=>({...state,song_order: status}))
    },
    ref: undefined,
    setref: (ref:React.MutableRefObject<AudioPlayer>)=>{set((state)=>({...state,ref:ref }))},
    current_index: 0, 
    song_order: "off",
      song: undefined,
   songs_list: [],
   setSongWithListenList: ( songs_list: Array<SongData>, index: number, )=>{
    set((state)=>({...state, song: songs_list[index], songs_list:songs_list, current_index: index }));
   },
   setCurrentIndex: (index: number)=>{
    set((state)=>({...state, current_index: index,}))
   },
   addfirstSonglist: (input: SongData,song_array: Array<SongData>, current_index: number)=>{
    song_array.splice(current_index+1, 0, input);
    set((state)=>({...state, songs_list: song_array,}));
},
   setSongs_list: (input: Array<SongData>)=>{set(((state)=>({...state, songs_list: input})))},
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