import { config } from "./AuthoriseHeader"


export const send_header =  { headers: {
    'Content-type': 'application-json'
}

}

export const send_with_authorise ={
    headers: {
        Authorization: config.headers.Authorization,
            'Content-type': 'application-json'
    }

}