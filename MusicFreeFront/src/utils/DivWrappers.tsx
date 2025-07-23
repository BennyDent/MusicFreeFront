import { PropsWithChildren } from "react";



export function ColumnWrapper({children}:PropsWithChildren){
return(
    <div style={{display:"flex", flexDirection: "column"}}>
        {children}
    </div>
);
}


export function RowWrapper({children}:PropsWithChildren){
return(
    <div style={{display:"flex", flexDirection: "row"}}>
        {children}
    </div>
);
    
}