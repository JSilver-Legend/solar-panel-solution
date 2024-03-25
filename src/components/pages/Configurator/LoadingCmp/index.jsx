import { Spin } from 'antd'
import React from 'react'

import styles from '../configurator.module.scss'

const LoadingCmp = () => {
    return (
        <div className={styles.loadingContainer}>
            <Spin tip='Loading' size='large' className={styles.spinContainer} />
        </div>        
    )
  }
  
  export default LoadingCmp