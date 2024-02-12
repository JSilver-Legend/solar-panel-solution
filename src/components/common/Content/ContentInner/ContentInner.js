import React from 'react';
import styles from './container.module.scss';
import cn from 'classnames';

const ContentInner = ({className,children,...props}) => {

  let containerStyle = cn(styles.content,{
    [`${className}`]: className
  });

  return (
    <div className={containerStyle} {...props}>
      {children}
    </div>
  )
}

export default ContentInner;
