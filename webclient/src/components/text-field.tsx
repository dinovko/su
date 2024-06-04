import { TextField } from '@mui/material';
import React, { memo, useEffect } from 'react'

type CustomTextFieldProps = {
  value: any;
  onChange: (v: any) => void;
  name: string;
  label: string;
  [key: string]: any
}
const CustomTextField: React.FC<CustomTextFieldProps> = memo(({ onChange, value, name, label, ...rest }) => {
  const [inputValue, setinputValue] = React.useState('');

  const onBlur = () => {
    onChange(inputValue);
  }

  const onChangeInput = (e: any) => {
    if (e.target.value) {
      setinputValue(e.target.value);
    }
  }

  useEffect(() => {
    setinputValue(value);
  }, []);

  return (
    <TextField
      {...rest}
      id={name}
      name={name}
      // label={label}
      value={inputValue}
      onBlur={onBlur}
      onChange={onChangeInput}
      variant="outlined"
    />
  )
},(prev, next)=>{
  return prev.value === next.value
})
export default CustomTextField;