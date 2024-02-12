import React from 'react';
import { Row } from 'antd';
import styles from './row.module.scss';

const StandardRow = ({
  className,
  children,
  ...props
}) => {
  return(
    <Row type="flex" className={styles.row} {...props}>
      {children}
    </Row>
  )
}

export default StandardRow;
