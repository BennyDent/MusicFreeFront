import request from 'graphql-request';
import { url } from './UrlAdress';

type data = {
    id: string
}
export const profilefn= async (string:string, variables:data) => {
  return  request(url, string, variables);
}