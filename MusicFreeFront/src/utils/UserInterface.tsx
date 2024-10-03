

export interface UserInterface{
    name: string,
    description: string,
    id: string
    city: Object,
    country: Object,
    hobbies: Array<Object>,
    age: number
}
export interface ShortUserInterface{
    name: string,
    description: string,
    id: string
    city: Object,
    country: Object,
    age: number
}
interface Object{
    name: string
}