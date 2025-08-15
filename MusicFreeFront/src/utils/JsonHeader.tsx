import { config } from "./AuthoriseHeader"


export const send_header =  { 
    'Content-type': 'application-json',


}

export const send_with_authorise ={
    headers: {
        Authorization: config.headers.Authorization,
            'Content-type': 'application-json'
    }

}