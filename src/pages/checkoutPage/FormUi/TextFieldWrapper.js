import { TextField } from '@mui/material'
import { useField } from 'formik'
import React from 'react'

const TextFieldWrapper=({
    name,
    ...otherProps
})=>{
    const [field,mata]=useField(name)
    // console.log(field,mata)
    const configTextfield ={
        ...field,
        ...otherProps,
        fullWidth:true,
        variant:'outlined'
        
    };
    if(mata && mata.touched && mata.error){
        configTextfield.error = true;
        configTextfield.helperText = mata.error ; 
    }
  return (
    <TextField {...configTextfield}/>
  )
}

export default TextFieldWrapper;