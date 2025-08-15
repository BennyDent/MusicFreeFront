

interface Url_Make_Interface{
    url: string,
    make:(url:string, strings:Array<string>)=> string,
}


export const urlmaker = {
    url: "http://localhost:8000/",
    make: (url:string, strings:Array<string>)=>{
        var result = url;
        strings.forEach((sting:string)=>{result=result+sting+"/"})
        console.log(result.slice(0,-1));
        return result.slice(0,-1);
    }
}


export function url_fn( array: Array<string>){
return urlmaker.make(urlmaker.url, array);
}