import React from 'react';
import cn from 'classnames';

import styles from './container.module.scss';

const StandardContainer = ({ className, ...props }) => {
    let containerStyle = cn(styles.container,{
        [`${className}`]: className
    });

    return (
        <div className={containerStyle} {...props}/>
    )
}

export default StandardContainer;
