import { ListenersFetch } from "./ListenersFetch";
import { MostPopularComponent } from "./MostPopularComponent";




export interface AuthorPageData{
    name: string,
    img_filename: string,
    id: string,
}

export function AuthorPageTemplate({name, img_filename, id}:AuthorPageData){



return(<div style={{display:"flex", flexDirection: "column"}}>
<div style={{display: "flex", flexDirection: "row"}}>
 <img src={""+img_filename}/>
<h1> {name}</h1>   
</div>
<ListenersFetch id={id}/>
<h1>Songs:</h1>
<MostPopularComponent type={"songs"} id={id}/>
<h1>Albumns:</h1>
<MostPopularComponent type={"albumns"} id={id}/>
</div>);
}