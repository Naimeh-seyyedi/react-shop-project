import React from "react";
import { Button, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";


const ButtonWrapper = ({
    children,
    ...otherProps
})=>{
    const {submitForm } =useFormikContext();

    const handleSubmit = ()=>{
        submitForm ();
      
     
    }

    const configButton = {
       color:"primary",
       variant:"contained",
        fullWidth:true,
        
        onClick:handleSubmit
    }
  
    return (
      <Button {...configButton} > {children} </Button>
        

    )
}


export default ButtonWrapper;