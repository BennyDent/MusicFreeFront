



export const urlmaker = {
    url: "https://localhost:7190/",
    make: (url:string, strings:Array<string>)=>{
        var result = url;
        strings.forEach((sting:string)=>{result=result+sting+"/"})
        console.log(result.slice(0,-1));
        return result.slice(0,-1);
    }
}