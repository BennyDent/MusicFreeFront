import Cookies from "js-cookie"
import axiosimport, {Axios, AxiosResponse} from "axios";



export const config = {headers:{Authorization: "Bearer "+ Cookies.get("Auth")}}




export function cookie_check(){
    if(Cookies.get("Auth")==undefined){
 return false;} else return true;
    }
