import { url_fn } from "./urlmaker"
import { send_header } from "./JsonHeader";


export const fetchPost= async (urls: string[],body:Object )=>{
 
    var url = url_fn(urls);
    return await fetch(url, {method: "POST", mode: "cors", headers:{...send_header}, body: JSON.stringify(body)})
    }


export const fectchFormDataPost = async (urls: string[], body: FormData,)=>{
var url = url_fn(urls);
 return await fetch(url, {method: "POST", mode: "cors", headers:{'Content-Type':" multipart/form-data, boundary=&&&&&" }, body: body})

}