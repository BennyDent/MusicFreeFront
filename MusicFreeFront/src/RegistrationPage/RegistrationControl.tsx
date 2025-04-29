import  {useState} from "react";
import RegistrationComponent from './RegistrationComponent'
import VeritificationComponent from "./VeritificationComponent";


export function RegistrationControl(){
const [registration, setRegistration]= useState<"registration"|string>("registration");

function StateHandler(string: string){
    setRegistration(string);
}

if (registration=="registration") return <RegistrationComponent stateHandler={StateHandler}/>;
else return <VeritificationComponent state={registration}/>;
}


export default RegistrationControl;