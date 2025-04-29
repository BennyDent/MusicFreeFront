import Cookies from "js-cookie"



export const config = {headers:{Authorization: "Bearer "+ Cookies.get("Auth")}}