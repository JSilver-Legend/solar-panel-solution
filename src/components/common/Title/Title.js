import React from 'react';
import styles from './title.module.scss';
import cn from 'classnames';
import { Typography } from 'antd';

const Title = ({
  className,
  children,
  ...props
}) => {

  let titleStyle = cn(styles.title,{
    [`${className}`]: className
  });

  return (
    <div className={styles.container}>
      <Typography.Title level={2} className={titleStyle} {...props}>
        {children}
      </Typography.Title>
      <div className={styles.spacer}></div>
    </div>
  )
}

export default Title;
