import axios from "axios";
import { urlmaker } from "../utils/urlmaker";
import { PageInterface } from "../utils/PageInterface";


const queryfn = async (urlarray: string[] ):Promise<PageInterface>=>{
   
    return await axios.get(urlmaker.make(urlmaker.url, urlarray)).then((result)=>(result.data))};