import React from 'react';
import styles from './input.module.scss';
import cn from 'classnames';
import { Input as FormikInput } from 'formik-antd';
import { Input as AntInput, InputNumber } from 'antd';

const TextInput = ({className,block,formik,number,...props}) => {

  let textInput = cn(styles.input,{
    [`${className}`]: className,
    [`${styles['full-width']}`]: block,
  });

  if(formik){
    return <FormikInput className={textInput} {...props} />
  }

  if(number){
    return <InputNumber className={textInput} {...props} />
  }

  return (
    <AntInput className={textInput} {...props} />
  )
}

export default TextInput;
