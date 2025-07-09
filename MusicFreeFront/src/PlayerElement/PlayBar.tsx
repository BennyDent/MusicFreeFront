import { Slider } from "@mui/material";
import React from "react";

export function SliderComponent({value, setValue}:{value: number, setValue: (int: number)=>void}){

    return(<Slider value={value} onChange={(event: Event,value: number|number[])=>{if(!Array.isArray(value)){setValue(value)}}} />);
}