import React from "react";
import styles from "./listitem.module.scss";
import { List } from "antd";
import cn from "classnames";

const ResultListItem = ({ className, title, value, bold, ...props }) => {
  let listItemStyle = cn(styles["list__item"], {
    [`${className}`]: className,
    [`${styles["list__item--bold"]}`]: bold
  });

  return (
    <List.Item {...props} className={listItemStyle}>
      <List.Item.Meta title={<span>{title}</span>} />
      <span className={styles["list__item__value"]}>{value}</span>
    </List.Item>
  );
};

export default ResultListItem;
