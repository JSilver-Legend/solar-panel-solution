import React from "react";
import { Button as AntButton } from "antd";
import styles from "./button.module.scss";
import cn from "classnames";

const Button = ({ className, shape, type, ...props }) => {
  let buttonStyle = cn(styles.button, {
    [`${className}`]: className,
    [`${styles["button--link"]}`]: type === "link",
    [`${styles["botton--extra-padding"]}`]: shape !== "circle"
  });

  return (
    <AntButton shape="round" type={type} className={buttonStyle} {...props} />
  );
};

export default Button;
