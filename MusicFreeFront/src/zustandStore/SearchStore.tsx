import { create } from "zustand";



export const useSearchText =  create<{search: string, setSearch: (new_search: string)=>void}>((set)=>({
setSearch: (new_search: string)=>{set({search: new_search})},
search: ""
}))