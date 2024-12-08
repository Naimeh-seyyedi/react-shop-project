
import { MenuItem, TextField } from '@mui/material'
import { useField, useFormikContext } from 'formik'
import React from 'react'

const SelectWrapper=({
    name,
    options,
    ...otherProps
})=>{
  const {setFieldValue} =useFormikContext();
    const [field,mata]=useField(name);
    const handleChange = e =>{
      const {value} =e.target;
      setFieldValue(name,value)
    }

    const configSelect ={
        ...field,
        ...otherProps,
       select:true,
        fullWidth:true,
        variant:'outlined',
        onchange:handleChange
    };
    if(mata && mata.touched && mata.error){
      configSelect.error = true;
      configSelect.helperText = mata.error ; 
    }
  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item,index)=>{
        
          return(
            <MenuItem key={index} value={options[item]}>
            {options[item]}
          </MenuItem>
          )
      })}
    </TextField>
  )
}

export default SelectWrapper;