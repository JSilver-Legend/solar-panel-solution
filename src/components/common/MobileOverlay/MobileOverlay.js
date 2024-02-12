/* eslint-disable no-unused-vars */
import React from 'react';
import { Icon, Typography } from 'antd';
import styles from './overlay.module.scss';
import cn from 'classnames';

const MobileOverlay = ({ children, open, onClose, hideMapButton, ...props }) => {

  let overlayStyle = cn(styles.overlay, {
    [styles.fadeInBottom]: open,
    [styles.fadeOutTop]: !open
  });

  if (!open) {
    return null;
  }

  function close() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <div className={overlayStyle}>
      <div hidden={hideMapButton} onClick={close} className={styles['overlay__actions']}>
      </div>
      {children}
    </div>
  )
}

export default MobileOverlay;
