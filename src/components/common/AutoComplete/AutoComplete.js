import React from "react";
import { AutoComplete as AntAutoComplete } from "antd";
import styles from "./input.module.scss";
import cn from "classnames";

const AutoComplete = ({ className, ...props }) => {
  let inputStyles = cn(styles["auto-complete-input"], {
    [`${className}`]: className
  });

  return <AntAutoComplete className={inputStyles} {...props} />;
};

export default AutoComplete;
