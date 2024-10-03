import {useForm, Controller} from "react-hook-form";
import { ContainerWrapper } from "../utils/ContainerWrapper";
import { AuthorSearch } from "../SearchForUpload/AuthorSearch";
import { AlbumnSearch } from "../SearchForUpload/AlbumnSearch";
import { AuthorData } from "../SearchForUpload/SearchResultComponent";
import { useMutation } from "@tanstack/react-query";
import React, {useState} from "react";
import axios from "axios";



 interface SongUploadData{
        name: string,
        albumn: string,
        author: string
    }

 interface mistakeStatus{
    file?: "is_required"|"wrong_format",
    
    author?: "is_required",
 }

 
export function SongUploadTemplate(){
    const [mastate, setMastate]= useState<Array<AuthorData>>([]);
    //var file = new FileList()
    const {handleSubmit, register, setError, formState:{errors}, control }= useForm({defaultValues:{name: ""}});
    const [albumnState, setalbState] = useState<AuthorData|undefined>({name: "", Id: ""});
    const [fileState, setfileState] = useState<File|undefined>();
   const [mistakesStatus, setmistakesStatus] = useState<mistakeStatus>({});
    
const mutationFunction = async (formData: FormData)=>(await axios.post("https://localhost:7190/music/song_upload", formData, {headers: {"Content-Type": 'multipart/form-data' }}))
   
    const {mutate}  = useMutation({mutationFn: mutationFunction});



    function handleSub(data:{name:string }){
        
        console.log(data);
        var result_data: SongUploadData;
        const formD = new FormData();
        if(fileState==undefined){
            setmistakesStatus({...mistakesStatus, file: "is_required" });
            return;
        }
        let file_format = fileState?.name.split('.').pop();
        console.log(file_format);
        let second_file_format = file_format;
        if(file_format!='.mp4'|| second_file_format != '.wav' ){
            setmistakesStatus({...mistakesStatus, file: "wrong_format"});
            return;
        }
        if(mastate== undefined){
            setmistakesStatus({...mistakesStatus, author: "is_required"});
            return;
        }
        let authors_id: string[] = [];
        mastate.forEach((data)=>{authors_id.push(data.Id)});
        formD.append('name', data.name);
        formD.append("albumn", albumnState!.Id);
        formD.append("author", JSON.stringify(authors_id));
        formD.append("song", fileState!);
        for (const value of formD.values()) {
            console.log(value);
          }
        mutate(formD);

    }
function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>){
setfileState(e.target.files![0]);

}


    return(<form onSubmit={handleSubmit(handleSub)}>
        <ContainerWrapper>
        <input {...register("name")} type="text"/>
        </ContainerWrapper>
       
           <AuthorSearch value={mastate} onChange={(data: Array<AuthorData>)=>{setMastate(data);
            console.log(data);
           }} />
        <ContainerWrapper>
            {mistakesStatus.author=="is_required" &&  <ContainerWrapper> <a>{"Song author is required"} </a>  </ContainerWrapper>}
           
            <AlbumnSearch  value={albumnState!} onChange={(m:AuthorData)=>{setalbState(m);}} author_id={mastate[0]?.Id}/>
        <input type="file"  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setfileState(e.target.files![0])}} />
            </ContainerWrapper> 
           {mistakesStatus.file=="is_required" &&  <ContainerWrapper> <a>{"Song file is required"} </a>  </ContainerWrapper>}
           {mistakesStatus.file=="wrong_format" &&  <ContainerWrapper> <a>{"Wrong file format! Use wav. or mp4. file formats to load music"} </a>  </ContainerWrapper>}
            <ContainerWrapper>
            <button  type="submit">submit</button>
       </ContainerWrapper>
    </form>)
}   

