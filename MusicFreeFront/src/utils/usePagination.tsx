import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";


export function usePagination(){
const [hasMore, setHasMore] = useState<boolean>(true);
const [page_index, setPage_Index] = useState<number>(1);

    return({hasMore: hasMore, setHasMore: setHasMore, page_index: page_index, next: (queryKey:string[],queryClient: QueryClient)=>{queryClient.invalidateQueries({queryKey: queryKey});
setPage_Index(page_index+1);
}  });
}