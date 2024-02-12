import React from 'react';
import { Button } from 'components/common';
import styles from './button.module.scss';

const OpenMenuButton = ({children,...props}) => {

  return(
    <div className={styles.button}>
      <Button
        type="primary"
        size="large"
        block
        {...props}
      >
      {children ? children : "Visa meny"}
      </Button>
    </div>
  )
}

export default OpenMenuButton;
