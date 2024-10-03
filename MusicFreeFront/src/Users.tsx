import { gql, request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';


const document = `
query($id: UUID!){
  user(where: {id:{eq:$id}}){
    name
    
  }
}
`

const requestFunc = async ()=>{
    return await request({document: document, url:"https://localhost:7177/graphql", variables: {id:"2455a14a-de33-4fcc-b274-12eb6d8b47b8"}});
}

export function UsersComponent(){
const {data, status} = useQuery({queryFn: requestFunc, queryKey: [1], retry: false});
if(status== "error"){
    return(<h1>Error</h1>)
} 
if (status== "pending"){
    return(<h1>Loading</h1>)
}
if (status=="success"){
    console.log(data);
    return(<div>
        {}
    </div>);
}
}