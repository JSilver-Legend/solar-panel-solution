import React from "react";
import { List } from "antd";
import { Button } from "components/common";
import { connect } from "react-redux";
import { roofsActions } from "state/roofs";
import { mapSelectors, mapActions } from "state/map";
import { utils } from "services";
import styles from "./list.module.scss";
import cn from "classnames";

const RoofList = ({
  roofs,
  removeRoof,
  roofInfoString,
  selectedRoofId,
  setSeletedRoof,
  setEditRoofOpen,
  setRoofMenuOpen,
  isDrawing,
  activateDrawingMode,
  ...props
}) => {
  let tempRoofs = roofs;

  function renderItem(roofItem) {
    let selected = roofItem.id === selectedRoofId;
    let listItemStyle = cn(styles["list__item"], {
      [`${styles["list__item--selected"]}`]: selected,
      [`${styles["list__item--override"]}`]: !selected
    });

    function handleMenu(){
      if(!isDrawing){
        if(utils.getIfMobile()){
          setRoofMenuOpen(false);
          activateDrawingMode();
        } else {
          setEditRoofOpen(true);
        }
      }
    }

    function handleSelect(id){
      if(!isDrawing){
        setSeletedRoof(id);
      }
    }

    function handleRemove(id){
      if(!isDrawing){
        removeRoof(id);
      }
    }

    return (
      <List.Item
        className={listItemStyle}
        onClick={() => handleSelect(roofItem.id)}
        actions={
          [
            <Button
              size="large"
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => handleRemove(roofItem.id)}
              style={{borderRadius: "50px", padding: "0 12px"}}
            />,
            <Button
              size="large"
              shape="circle"
              icon="edit"
              type="primary"
              onClick={() => handleMenu()}
              style={{borderRadius: "50px", padding: "0 12px"}}
            />
          ]
        }
      >
        <List.Item.Meta
          description={
            utils.roofInfoString(
              roofItem.southPosition,
              roofItem.obstacles,
              roofItem.roofType,
              roofItem.area
            )
          }
          //title={roofItem.name}
        />
      </List.Item>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={tempRoofs.filter(roof => roof.roofType !== "0")}
      className={styles.list}
      renderItem={renderItem}
    />
  );
};

const mapStateToProps = state => ({
  roofs: state.roofs.roofs,
  selectedRoofId: state.roofs.selectedRoofId,
  isDrawing: mapSelectors.isDrawing(state),
});

const mapDispatchToProps = dispatch => ({
  removeRoof: roofId => dispatch(roofsActions.removeRoof(roofId)),
  activateDrawingMode: () => dispatch(mapActions.activateDrawingMode()),
  setEditRoofOpen: open => dispatch(roofsActions.setEditRoofOpen(open)),
  setSeletedRoof: roofId => dispatch(roofsActions.setSeletedRoof(roofId)),
  setRoofMenuOpen: open => dispatch(roofsActions.setRoofMenuOpen(open)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoofList);
