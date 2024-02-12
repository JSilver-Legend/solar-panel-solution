import React from "react";
import { Button as AntButton } from "antd";
import styles from "./button.module.scss";
// import cn from "classnames";
import { LeftCircleOutlined } from '@ant-design/icons';

const Button = ({ className, shape, type, ...props }) => {
  return (
    <AntButton shape={shape} type={"primary"} className={styles["button"]} {...props} ><LeftCircleOutlined />Gå tillbaka</AntButton>
  );
};

export default Button;
