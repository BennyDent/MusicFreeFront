import { gql, TypedDocumentNode } from 'urql'


   export const name =  gql`
query($id: UUID!){
user(where: {id:{eq: $id }}){
name
}
}
`
export const description =gql`
query($id: UUID!){
user(where: {id:{eq: $id }}){
description
}
}
`

