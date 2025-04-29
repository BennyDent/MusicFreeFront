import axios from 'axios';
import {  auth_status, AuthStatus } from "./auth"
import {config} from "../utils/AuthoriseHeader"
export async function auth_check(): Promise<AuthStatus> {
  try{
 console.log(config)
  const state = await axios.get('https://localhost:7190/auth/check', config)
  const data: AuthStatus = {status: 'logged', username: state.data.username}  
  return data ;
} catch (e) {
  let data: AuthStatus = {status: 'loggedout', username: undefined}
  return data}}


//127.0.0.1:8000
//localhost:8000