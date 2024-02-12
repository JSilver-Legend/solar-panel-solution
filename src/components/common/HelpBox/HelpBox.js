/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './helpbox.module.scss';
import cn from 'classnames';
import { Typography } from 'antd';

const HelpBox = ({
  className,
  children,
  closed,
  ...props
}) => {
  function close() {
    closed = true;
  }
  return (
    <div className={styles['box']}>
      <Typography className={styles['text']}>This is a helpbox</Typography>
    </div>
  )
}

export default HelpBox;
