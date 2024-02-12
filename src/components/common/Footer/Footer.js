import React from 'react';
import styles from './footer.module.scss';
import cn from 'classnames';

const Footer = ({children,className,...props}) => {

  let footerStyle = cn(styles.footer,{
    [`${className}`]: className,
    //[`${styles['footer--one-child']}`]: React.Children.count(children) === 1
  });

  return (
    <div className={footerStyle}>
      {children}
    </div>
  )
}

export default Footer;
