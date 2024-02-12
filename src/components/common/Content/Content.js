import React from "react";
import styles from "./container.module.scss";
import cn from "classnames";

const Content = ({ className, children, ...props }) => {
  let containerStyle = cn(styles.container, {
    [`${className}`]: className
  });

  return (
    <div className={containerStyle} {...props}>
      {children}
    </div>
  );
};

export default Content;
