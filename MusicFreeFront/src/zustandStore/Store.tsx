import { create } from 'zustand'
import { AuthorData } from '../SearchForUpload/SearchResultComponent';
import H5AudioPlayer from 'react-h5-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import { LegacyRef, MutableRefObject } from 'react';
import { SongData } from '../utils/SongData';
import React from "react";

export interface PlaylistType{
    status:"radio"|"playlist",
    url_strings: string[],
   
}

export interface SrcStore{
   
    song_order: "on"|"off",
    ref:MutableRefObject<HTMLAudioElement> | undefined ,
    setref: (ref:MutableRefObject<HTMLAudioElement> | undefined)=>void,
    setSongWithListenList: ( songs_list: Array<SongData>, index: number )=> void
    song: SongData|undefined
    setSrc: (input: string|undefined)=>void,
    setSong: (input: SongData|undefined)=>Promise<void>,
    songs_list: Array<SongData>,
    setSongs_list: (input: Array<SongData>)=>Promise<void>,
    addfirstSonglist: (input: SongData, song_array: Array<SongData>, current_index: number)=>void,
    setSongOrder: (status:"on"|"off")=>void,
    playlist_type: PlaylistType ,
    setPlaylist_type:  (object: PlaylistType)=>Promise<void>, 
    mix: boolean,
    setMix: (string: boolean)=>void,
    back_index?: number,
    setBack_index: (input?: number) => Promise<void>
   
}


//setPlaylist_type: (name: "radio"|"playlist")=>{set((state)=>({{...state, playlist_type: name,}}))},



export const useSrcStore = create<SrcStore>((set) =>({
   mix: false,
   setBack_index: async (b: number|undefined)=>{set((state)=>({...state, back_index:  b}))},
   setMix: (string: boolean)=>{set((state)=>({...state, mix: string}));},
   
    session_id: undefined,
    setSession_id: (string: string|undefined)=>{set((state)=>({...state, session_id: string}))},
    setSongOrder: (status:"on"|"off")=>{
        set((state)=>({...state,song_order: status}))
    },
    ref: undefined,
setPlaylist_type: async (object: PlaylistType)=>{ await set((state)=>({...state, playlist_type: object}));},

playlist_type: {status:"playlist", url_strings: []},
   
    setref: (ref:MutableRefObject<HTMLAudioElement> | undefined)=>{set((state)=>({...state,ref:ref }))},
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
   setSongs_list: async (input: Array<SongData>)=>{set(((state)=>({...state, songs_list: input})))},
    setSrc:(input: string|undefined)=>{
        if(input==undefined){
            set((state)=>({ ...state,src: undefined}))
        }
        else{
            set((state)=>({...state, src: "https://localhost:7190/music/get_song/"+input}))
      
        }
  
    }, 
   setSong: async (input:SongData|undefined)=>{
    set((state)=>({...state, song: input}));

   }
  }));