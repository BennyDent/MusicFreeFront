import { useSearch } from "@tanstack/react-router";
import { urlmaker } from "../utils/urlmaker";
import {useQuery,gql} from "urql";
import { AuthorPageTemplate } from "./AuthorPageTemplate";


const  query = gql`query($id: UUID!){
  author(where:{id:{eq:$id}}){
    name
    img_filename
    id
     
  }
}`



function AuthorFetch(){
 
const {id}: {id: string} = useSearch({from: "/music_pages/author_page"});
const [result, reexecute] = useQuery({query: query, variables:{id}});
const {data, fetching, error} = result;
if (fetching) return <p>Loading...</p>;
if (error) return <p>Oh no... {error.message}</p>;
console.log(data);
return <AuthorPageTemplate name={data[0].author.name} img_filename={data[0].author.img_filename} id={data[0].author.id}/> ;
}