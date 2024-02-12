/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Checkbox, Popover, Icon } from 'antd';
import styles from './checkbox.module.scss';

const CustomCheckbox = ({ title, value, onChange, ...props }) => {

  const [checked, setChecked] = useState(value);

  function toggleChecked() {
    setChecked(!checked);
  }

  useEffect(() => {
    setChecked(value);
  }, [value])

  useEffect(() => {
    if (onChange) {
      onChange(checked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  return (
    <div className={styles['checkbox__container']} onClick={toggleChecked}>
      <span className={styles['checkbox__title']}>{title}</span>
      <Checkbox
        checked={value}
        onChange={toggleChecked}
        {...props}
      />
    </div>
  )
}

export default CustomCheckbox;
