import { SetStateData } from "../SearcgPage/SongSearch";
import {useState, useEffect} from "react";
import { AlbumnFetch } from "../utils/AlbumnFetch";
import { ColumnWrapper, RowWrapper } from "../utils/DivWrappers";
import { AlbumnComponent } from "../SongComponents/AlbumnComponent";
function ReccomendationComponent({url_strings, title}:{url_strings: string[], title: string}){
const [data, setData] = useState<Array<AlbumnFetch>>([]);

useEffect(()=>{
    SetStateData(setData,[...url_strings]);
},[data]);


return(<ColumnWrapper>
<h1>{title}</h1>
<RowWrapper>
{data.map((a: AlbumnFetch, index: number)=>(
    <AlbumnComponent status='recommendation' data={a} key={index}/>
))}
</RowWrapper>
</ColumnWrapper>);
}