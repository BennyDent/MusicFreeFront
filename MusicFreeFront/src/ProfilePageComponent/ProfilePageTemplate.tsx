import { Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { useSearch } from "@tanstack/react-router";
import {ProfileComponent, DescriptionComponent} from "./ProfileComponent";
import {name, description} from "./ProfileTemplateStrings";
import { ProfileSearch } from "../SearchsInterfaces/ProfileInterfaces";
import { SendMessageComponent } from "./SendMessageComponent";
import { useQuery, gql } from "urql";
import {UserInterface} from "./../utils/UserInterface"

const ProfileQuery = gql`query($id: UUID!){
user(where: {id:{eq: $id }}){
name
description
age
country{
    name
}
city{
    name
}
hobbies{
    name
}
}
}`

 export function ProfilePageTemplate(){
    const{ self, id}:ProfileSearch = useSearch({from: "/profile"});
    let isSelf = false;
    if (self==id){
        isSelf=true
    }
    const [result, reexecuteQuery] = useQuery({
        query:ProfileQuery,
        variables: { id },
      });
      const { data, fetching, error } = result;

      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;
      console.log(data);
      const data_object: UserInterface = data.user[0]
      console.log(data_object)
    const name = "name"
    let hobbies_text = ""
    for (const hobby_object of data_object.hobbies){
        if(hobbies_text != "")
        hobbies_text += ","
        hobbies_text += hobby_object.name
    }
    hobbies_text += "."
    return(<div>
       
       <ProfileComponent value={data_object.name} status="name" />
        <ProfileComponent value={data_object.description} status="description" />
        <ProfileComponent value={data_object.city.name} status="city"/>
        <ProfileComponent value={data_object.country.name} status="country"/>
        <ProfileComponent value={data_object.city.name} status="age"/>
        <ProfileComponent value={hobbies_text} status="hobbies"/>
        { isSelf==false && <SendMessageComponent self={self} id={id}/>}
    </div>);
}


