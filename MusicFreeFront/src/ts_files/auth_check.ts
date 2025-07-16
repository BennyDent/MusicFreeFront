import axios from 'axios';
import {  auth_status, AuthStatus } from "./auth"
import {config} from "../utils/AuthoriseHeader";
import { url_fn } from '../utils/urlmaker';
export async function auth_check(): Promise<AuthStatus> {
  try{
 console.log(config)
  const state = await axios.get(url_fn(['auth', 'check']), config);
  const data: AuthStatus = {status: 'logged', username: state.data.username}  
  return data ;
} catch (e) {

 try{
    const state = axios.post(url_fn(['auth', 'guest', 'login']));
    const data: AuthStatus = {status: 'guest_user'}
     return data
  }catch(e){
const data: AuthStatus = {status:"logged_out"}
  return data
}
  }}




  

//127.0.0.1:8000
//localhost:8000