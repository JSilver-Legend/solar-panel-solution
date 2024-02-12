import React from 'react';
import styles from './container.module.scss';
import cn from 'classnames';

const StandardContainer = ({className,...props}) => {

  let containerStyle = cn(styles.container,{
    [`${className}`]: className
  });

  return (
    <div className={containerStyle} {...props}/>
  )
}

export default StandardContainer;
