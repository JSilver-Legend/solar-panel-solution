import React from "react";
import { List } from "antd";
import { Button } from "components/common";
import { connect } from "react-redux";
import { obstaclesActions } from "state/obstacles";
import { mapSelectors, mapActions } from "state/map";
import { utils } from "services";
import styles from "./list.module.scss";
import cn from "classnames";

const obstacleList = ({
  obstacles,
  removeObstacle,
  obstacleInfoString,
  selectedObstacleId,
  setSelectedObstacle,
  setEditObstacleOpen,
  setObstacleMenuOpen,
  isDrawing,
  activateDrawingMode,
  ...props
}) => {

  function renderItem(obstacleItem) {
    let selected = obstacleItem.id === selectedObstacleId;
    let listItemStyle = cn(styles["list__item"], {
      [`${styles["list__item--selected"]}`]: selected,
      [`${styles["list__item--override"]}`]: !selected
    });

    function handleMenu() {
      if (!isDrawing) {
        if (utils.getIfMobile()) {
          setObstacleMenuOpen(false);
          activateDrawingMode();
        } else {
          setEditObstacleOpen(true);
        }
      }
    }

    function handleSelect(id) {
      if (!isDrawing) {
        setSelectedObstacle(id);
      }
    }

    function handleRemove(id) {
      if (!isDrawing) {
        removeObstacle(id);
      }
    }

    return (
      <List.Item
        className={listItemStyle}
        onClick={() => handleSelect(obstacleItem.id)}
        actions={
          [
            <Button
              size="large"
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => handleRemove(obstacleItem.id)}
              style={{ borderRadius: "50px", padding: "0 12px" }}
              key={"delBtn" + obstacleItem.id}
            />,
            <Button
              size="large"
              shape="circle"
              icon="edit"
              type="primary"
              onClick={() => handleMenu()}
              style={{ borderRadius: "50px", padding: "0 12px" }}
              key={"editBtn" + obstacleItem.id}
            />
          ]
        }
      >
        <List.Item.Meta
          description={
            utils.obstacleInfoString(
              obstacleItem.obstacleType,
              obstacleItem.area
            )
          }
        //title={obstacleItem.name}
        />
      </List.Item>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={obstacles}
      className={styles.list}
      renderItem={renderItem}
    />
  );
};

const mapStateToProps = state => ({
  obstacles: state.obstacles.obstacleList,
  selectedObstacleId: state.obstacles.selectedObstacleId,
  isDrawing: mapSelectors.isDrawing(state),
});

const mapDispatchToProps = dispatch => ({
  removeObstacle: obstacleId => dispatch(obstaclesActions.removeObstacle(obstacleId)),
  activateDrawingMode: () => dispatch(mapActions.activateDrawingMode()),
  setEditObstacleOpen: open => dispatch(obstaclesActions.setEditObstacleOpen(open)),
  setSelectedObstacle: obstacleId => dispatch(obstaclesActions.setSelectedObstacle(obstacleId)),
  setObstacleMenuOpen: open => dispatch(obstaclesActions.setObstacleMenuOpen(open)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(obstacleList);
