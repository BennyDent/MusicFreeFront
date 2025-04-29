 import {auth_check} from './auth_check';


 export const auth_status: AuthStatus = {
    status: 'loggedout',
    username: undefined,
 };

 export type AuthStatus = {
    status: 'logged' | 'loggedout',
    username? : string,
  
 }

export const auth: Auth= {
    state: auth_status,
    login: (status: AuthStatus)=>{
         auth.state=status
    },
    logout: ()=>{
        auth.state = auth_status
    },
    check: auth_check,

}



export type Auth = {
    state: AuthStatus
    login: (state:AuthStatus)=>void,
    logout: ()=> void,
    check: ()=>Promise<AuthStatus>
}