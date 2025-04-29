import { SongData } from "../zustandStore/Store";



function DeleteFunction(object: string, objects_array: Array<string>){
  
let type: "song" = "song";
var index = -1
for(var i =0, len = objects_array.length; i< len; i++)
if(CompareFunction(type, object, objects_array[i]!))
{
    index = i;
    break
}

return index;
}

export function DeleteObject_Array(object: string, objects_array: Array<string> ): Array<string>{

    var new_copy = objects_array; 
var index = DeleteFunction(object, objects_array)
if(index==-1){
    
    return new_copy;  }
    new_copy.splice(index,1)
    return new_copy;

}




export function DeleteObject_Index(object: string, objects_array: Array<string> ): -1|Array<string>{

 var new_copy = objects_array; 
var index = DeleteFunction(object, objects_array)
if(index==-1){
    
        return -1;  
    
  
}
new_copy.splice(index,1)
    return new_copy;
}


function CompareFunction(type: "song", object1: string, object2: string){
if(type=="song"){
    if(object1==object2&& object1== object2){
        // проверить обязательные характеристики
        return true;
    }else{return false;}
}
}