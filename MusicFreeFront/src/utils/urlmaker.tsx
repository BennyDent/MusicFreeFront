

interface Url_Make_Interface{
    url: "https://localhost:7190/",
    make:(url:string, strings:Array<string>)=> string,
}


export const urlmaker = {
    url: "https://localhost:7190/",
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