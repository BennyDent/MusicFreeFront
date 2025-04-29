import { styled } from "@mui/material";
import { grey } from "../../SongComponents/ThreeDotsButton";



export const RegistrationInput = styled('div')(({theme})=>({
    backgroundColor: theme.palette.mode =="dark" ? grey['800']: grey['50']
}))